.DELETE_ON_ERROR:

default: all

.PHONY: all clean deploy-test deploy-test-content

NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
GOOGLE_LIBS:=$(shell find src/gcloud/lib -name '*.sh')
GOOGLE_ACTIONS:=$(shell find src/gcloud/actions -name '*.sh')
GOOGLE_SRC:=$(GOOGLE_LIBS) $(GOOGLE_ACTIONS)
INTRAWEB_SRC:=$(shell find src/intraweb -name '*.sh') $(GOOGLE_SRC)
SOURCEABLE_BUNDLES:=$(shell find src/gcloud/actions -name "*.sh" -not -name "inc.sh")
SOURCEABLE_TEMPLATE:=src/gcloud/sources/sourceable-template.sh
LINKS:=.build/gcloud/lib .build/gcloud/actions
DIST_BASE:=intraweb $(patsubst src/gcloud/actions/%.sh,%,$(SOURCEABLE_BUNDLES))
DIST_FILES:=$(patsubst %, dist/%.sh, $(DIST_BASE))
APPENGINE_FILES:=$(shell find src/appengine -type f -not -name "package-lock.json" -not -path "*node_modules/*")
HELLO_WORLD_WEB_FILES:=$(shell find src/test/hello-world-web -type f)

all: $(DIST_FILES)

# we do this instead of 'rm -f $(DIST_FILES)' for safety
clean:
	rm -rf dist/* .build/* .deploy-app .deploy-content

dist/, .build/gcloud/sources:
	mkdir -p $@

dist/intraweb.sh: src/intraweb/intraweb.sh dist/ $(INTRAWEB_SRC)
	$(BASH_ROLLUP) $< $@

$(patsubst src/gcloud/actions/%, .build/gcloud/sources/%, $(SOURCEABLE_BUNDLES)): $(SOURCEABLE_TEMPLATE) | .build/gcloud/sources
	cp $< $@
	echo "source ../actions/$(notdir $@)" >> $@

$(LINKS): .build/%: src/%
	ln -s ../../$< $@

$(patsubst src/gcloud/actions/%, dist/%, $(SOURCEABLE_BUNDLES)): dist/%: .build/gcloud/sources/% src/gcloud/actions/% $(GOOGLE_LIBS) | $(LINKS)
	$(BASH_ROLLUP) $< $@

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

.deploy-app: $(APPENGINE_FILES)
	$(eval DEPLOY_APP=true)
	touch $@

.deploy-content: $(HELLO_WORLD_WEB_FILES)
	$(eval DEPLOY_CONTENT=true)
	touch $@

####
## sourceable function bundles
####
#dist/gcloud-projects-create.sh: src/gcloud/sources/gcloud-projects-create.sh dist/ $(GOOGLE_SRC)
#	$(BASH_ROLLUP) $< $@

#dist/gcloud-projects-iap-oauth-setup.sh: src/gcloud/sources/gcloud-projects-iap-oauth-setup.sh dist/ $(GOOGLE_SRC)
#	$(BASH_ROLLUP) $< $@

#dist/gcloud-storage-buckets-create.sh: src/gcloud/sources/gcloud-storage-buckets-create.sh dist/ $(GOOGLE_SRC)
#	$(BASH_ROLLUP) $< $@

## end sourceable function bundles
