######
### meta configuration
######
.DELETE_ON_ERROR:

default: all

.PHONY: all clean deploy-test deploy-test-content lint lint-fix

### /end meta configuration

######
### variables; primarily file references
######

# executables
NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
CATALYST_SCRIPTS:=$(shell cd src/appengine && npm bin)/catalyst-scripts

# source files
GOOGLE_LIBS:=$(shell find src/gcloud/lib -name '*.sh')
GOOGLE_ACTIONS:=$(shell find src/gcloud/actions -name '*.sh')
GOOGLE_SRC:=$(GOOGLE_LIBS) $(GOOGLE_ACTIONS)

INTRAWEB_SRC:=$(shell find src/intraweb -name '*.sh') $(GOOGLE_SRC)

SOURCEABLE_BUNDLES:=$(shell find src/gcloud/actions -name "*.sh" -not -name "inc.sh")
SOURCEABLE_TEMPLATE:=src/gcloud/sources/sourceable-template.sh

# TODO: does App Engine use package-lack.json or not?
APPENGINE_NON_JS_FILES:=$(shell find src/appengine -type f\
	-not -name "*.js"\
	-not -path "*node_modules/*"\
	-not -name "env-variables.yaml"\
	-not -path "*.yalc*" -not -name "yalc.lock")
# the 'main' app.js is specified on it'sown, so excluded here.
APPENGINE_JS_SRC:=$(shell find src/appengine -type f -name "*.js"\
	-not -name "app.js"\
	-not -path "*node_modules/*")
DIST_APP_NON_JS:=$(patsubst src/%, dist/%, $(APPENGINE_NON_JS_FILES))
DIST_APP=dist/appengine/app.js
HELLO_WORLD_WEB_FILES:=$(shell find src/test/hello-world-web -type f)

# intermediate build resources
LINKS:=.build/gcloud/lib .build/gcloud/actions

# distribution files
BASH_SCRIPTS:=intraweb $(patsubst src/gcloud/actions/%.sh,%,$(SOURCEABLE_BUNDLES))
DIST_SCRIPTS:=$(patsubst %, dist/%.sh, $(DIST_SCRIPTS))

DIST_FILES:=$(DIST_SCRIPTS) $(DIST_APP_NON_JS) $(DIST_APP)

### /end variables


all: $(DIST_FILES)

# we do this instead of 'rm -f $(DIST_FILES)' for safety
clean:
	rm -rf dist/* .build/* .deploy-app .deploy-content

######
### build directives
######

### setup
# ensure the dist and intermediate build dirs exist
dist/, .build/gcloud/sources:
	mkdir -p $@

### intraweb.sh script
dist/intraweb.sh: src/intraweb/intraweb.sh dist/ $(INTRAWEB_SRC)
	$(BASH_ROLLUP) $< $@


### build the sourceable gcloud bundles
# create intermediate template files
$(patsubst src/gcloud/actions/%, .build/gcloud/sources/%, $(SOURCEABLE_BUNDLES)): $(SOURCEABLE_TEMPLATE) | .build/gcloud/sources
	cp $< $@
	echo "source ../actions/$(notdir $@)" >> $@

# create links so the intermediate template references work
$(LINKS): .build/%: src/%
	ln -s ../../$< $@

# generate the actual gcloud bundles
$(patsubst src/gcloud/actions/%, dist/%, $(SOURCEABLE_BUNDLES)): dist/%: .build/gcloud/sources/% src/gcloud/actions/% $(GOOGLE_LIBS) | $(LINKS)
	$(BASH_ROLLUP) $< $@

### build the dist-ready AppEngine
$(DIST_APP_NON_JS): dist/%: src/%
	mkdir -p $(dir $@)
	cp $< $@

$(DIST_APP): dist/%: src/% $(APPENGINE_JS_SRC) src/appengine/package.json
	cd src/appengine && JS_FILE="$(realpath $<)" JS_OUT="$(realpath $@)" $(CATALYST_SCRIPTS) build

######
### test directives
######

# TODO: this is broken at the moment. Need to add commands that look for a 'test' site configuration and then generate one if not present

deploy-test: dist/intraweb.sh .deploy-app .deploy-content
	@if [[ "$(DEPLOY_APP)" ]] && [[ "$(DEPLOY_CONTENT)" ]]; then\
		echo "Deploying app & content...";\
		./dist/intraweb.sh --assume-defaults deploy || rm .deploy-*;\
	elif [[ "$(DEPLOY_APP)" ]]; then\
		echo "Deploying app...";\
		./dist/intraweb.sh --assume-defaults --no-deploy-content deploy || rm .deploy-app;\
	elif [[ "$(DEPLOY_CONTENT)" ]]; then\
		echo "Deploying content...";\
		./dist/intraweb.sh --assume-defaults --no-deploy-app deploy || rm .deploy-content;\
	fi

deploy-test-content: dist/intraweb.sh .deploy-content
	./dist/intraweb.sh --assume-defaults --no-deploy-app deploy || rm .deploy-content

.deploy-app: $(DIST_APP) $(DIST_APP_NON_JS)
	$(eval DEPLOY_APP=true)
	touch $@

.deploy-content: $(HELLO_WORLD_WEB_FILES)
	$(eval DEPLOY_CONTENT=true)
	touch $@

### /end build directives

lint:
	cd src/appengine && $(CATALYST_SCRIPTS) lint
