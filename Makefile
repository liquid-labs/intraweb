.DELETE_ON_ERROR:

default: all

NPM_BIN:=$(shell npm bin)
BASH_ROLLUP:=$(NPM_BIN)/bash-rollup
GOOGLE_SRC=$(shell find src/google/actions src/google/lib -name '*.sh')
INTRAWEB_SRC=$(shell find src/intraweb -name '*.sh') $(GOOGLE_SRC)
DIST_BASE:=google-projects-create intraweb
DIST_FILES:=$(patsubst %, dist/%.sh, $(DIST_BASE))

OBJECTS = $(addprefix build/,$(addsuffix .o,$(FILES)))

all: $(DIST_FILES)

dist/:
	mkdir -p $(dir $@)

# note, this file is generated to be source-able, but not directly executable
dist/google-projects-create.sh: src/google/sources/google-projects-create.sh dist/ $(GOOGLE_SRC)
	$(BASH_ROLLUP) $< $@

dist/intraweb.sh: src/intraweb/intraweb.sh dist/ $(INTRAWEB_SRC)
	$(BASH_ROLLUP) $< $@
