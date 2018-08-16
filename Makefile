# The Cooker Project build automation file
# ========================================


# Meta targets
# ------------

default: dev

again: clean dev


# Real targets
# ------------


deploy: prod
	./deploy.sh

prod:
	npx webpack --mode production

test:
	npm test

dev:
	npx webpack --mode development

clean:
	rm -rf dist

