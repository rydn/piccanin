SHELL := /bin/bash
BASE_DIR= ${PWD}
OUT_DIR= ${BASE_DIR}/out
RELEASE_DIR= ${OUT_DIR}/release
DEBUG_DIR= ${OUT_DIR}/debug
build:
	@echo "Building project..."
	@grunt build
	@echo "done!"
init:
	@echo "Getting node dependencies with npm..."
	@npm install -d
	@echo "done!";
clean:
	@echo "Cleaning output directories..."
	@rm -fr ${OUT_DIR}/*
	@mkdir ${DEBUG_DIR}
	@mkdir ${RELEASE_DIR}
	@echo "done!"
.PHONY: build