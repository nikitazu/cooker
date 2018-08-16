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

dev:
	npx webpack --mode development

prod:
	npx webpack --mode production

clean:
	rm -rf dist

