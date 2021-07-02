.DELETE_ON_ERROR:

default: all

.PHONY: all clean deploy-test

NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
GOOGLE_LIBS:=$(shell find src/gcloud/lib -name '*.sh')
GOOGLE_ACTIONS:=$(shell find src/gcloud/actions -name '*.sh')
GOOGLE_SRC:=$(GOOGLE_LIBS) $(GOOGLE_ACTIONS)
INTRAWEB_SRC:=$(shell find src/intraweb -name '*.sh') $(GOOGLE_SRC)
SOURCEABLE_BUNDLES:=gcloud-projects-create \
	gcloud-projects-iap-oauth-setup \
	gcloud-storage-buckets-create \
	gcloud-storage-buckets-configure
DIST_BASE:=intraweb $(SOURCEABLE_BUNDLES)
DIST_FILES:=$(patsubst %, dist/%.sh, $(DIST_BASE))
APPENGINE_FILES:=$(shell find src/appengine -type f -not -name "package-lock.json" -not -path "*node_modules/*")
HELLO_WORLD_WEB_FILES:=$(shell find src/test/hello-world-web -type f)

OBJECTS = $(addprefix build/,$(addsuffix .o,$(FILES)))

test:
	echo $(SOURCEABLE_BUNDLES)

all: $(DIST_FILES)

# we do this instead of 'rm -f $(DIST_FILES)' for safety
clean:
	rm -f dist/* .deploy-app .deploy-content

dist/:
	mkdir -p $(dir $@)

dist/intraweb.sh: src/intraweb/intraweb.sh dist/ $(INTRAWEB_SRC)
	$(BASH_ROLLUP) $< $@

# TODO: use 'gcloud-' on the 'actions' as well, then we can include the specific action and limit this to GOOGLE_LIBS
$(patsubst %, dist/%.sh, $(SOURCEABLE_BUNDLES)): dist/%: src/gcloud/sources/% dist/ $(GOOGLE_SRC)
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
