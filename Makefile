.DELETE_ON_ERROR:

default: all

NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
GOOGLE_SRC=$(shell find src/gcloud/actions src/gcloud/lib -name '*.sh')
INTRAWEB_SRC=$(shell find src/intraweb -name '*.sh') $(GOOGLE_SRC)
SOURCEABLE_BUNDLES:=gcloud-projects-create gcloud-projects-iap-oauth-setup gcloud-storage-buckets-create
DIST_BASE:=intraweb $(SOURCEABLE_BUNDLES)
DIST_FILES:=$(patsubst %, dist/%.sh, $(DIST_BASE))

OBJECTS = $(addprefix build/,$(addsuffix .o,$(FILES)))

all: $(DIST_FILES)

# we do this instead of 'rm -f $(DIST_FILES)' for safety
clean:
	rm -f dist/*

dist/:
	mkdir -p $(dir $@)

dist/intraweb.sh: src/intraweb/intraweb.sh dist/ $(INTRAWEB_SRC)
	$(BASH_ROLLUP) $< $@

$(patsubst %, dist/%.sh, $(SOURCEABLE_BUNDLES)): dist/%: src/gcloud/sources/% dist/ $(GOOGLE_SRC)
	$(BASH_ROLLUP) $< $@

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
