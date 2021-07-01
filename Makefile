.DELETE_ON_ERROR:

default: all

NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
GOOGLE_SRC=$(shell find src/google/actions src/google/lib -name '*.sh')
INTRAWEB_SRC=$(shell find src/intraweb -name '*.sh') $(GOOGLE_SRC)
SOURCEABLE_BUNDLES:=google-projects-create google-projects-iap-oauth-setup google-storage-buckets-create
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

$(patsubst %, dist/%.sh, $(SOURCEABLE_BUNDLES)): dist/%: src/google/sources/% dist/ $(GOOGLE_SRC)
	$(BASH_ROLLUP) $< $@

####
## sourceable function bundles
####
#dist/google-projects-create.sh: src/google/sources/google-projects-create.sh dist/ $(GOOGLE_SRC)
#	$(BASH_ROLLUP) $< $@

#dist/google-projects-iap-oauth-setup.sh: src/google/sources/google-projects-iap-oauth-setup.sh dist/ $(GOOGLE_SRC)
#	$(BASH_ROLLUP) $< $@

#dist/google-storage-buckets-create.sh: src/google/sources/google-storage-buckets-create.sh dist/ $(GOOGLE_SRC)
#	$(BASH_ROLLUP) $< $@

## end sourceable function bundles
