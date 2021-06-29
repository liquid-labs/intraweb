.DELETE_ON_ERROR:

default: all

NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
SCRIPTS:=create-google-project intraweb
DIST_FILES:=$(patsubst %, dist/%.sh, $(SCRIPTS))

OBJECTS = $(addprefix build/,$(addsuffix .o,$(FILES)))

all: $(DIST_FILES)

dist/:
	mkdir -p $(dir $@)

dist/create-google-project.sh: src/gcloud/create-google-project.sh dist/
	$(BASH_ROLLUP) $< $@

dist/intraweb.sh: src/intraweb/intraweb.sh dist/
	$(BASH_ROLLUP) $< $@
