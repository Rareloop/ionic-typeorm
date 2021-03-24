# Ionic Libs

[![pipeline status](https://gitlab.rareloop.com/ionic-libraries/ionic-libs-src/badges/master/pipeline.svg)](https://gitlab.rareloop.com/ionic-libraries/ionic-libs-src/-/commits/master)

[![coverage report](https://gitlab.rareloop.com/ionic-libraries/ionic-libs-src/badges/master/coverage.svg)](https://gitlab.rareloop.com/ionic-libraries/ionic-libs-src/-/commits/master)

This is the source code for the Rareloop app libraries. It contains common features that can be included in our apps. The dist builds folder contains git submodules so you can then import the feature. See the other repos within <https://gitlab.rareloop.com/ionic-libraries/>

---

</br>

## Publishing updates to the library

To publish an update we need to build the library and then check-in the dist output in the relevant `git submodule`.

</br>

Step 1: MR of changes

Create a branch, raise a MR and get your changes merged into `master`. Once `master` has been updated you are ready to update the dist.

</br>

Step 2: Update library version

Update the version of the library in `projects/<project name>/package.json`.

</br>

Step 3: Build new dist

Run `npm run build <project name>` to build the project and update the dist correctly.</br>

Or to build all projects use `npm run build:all`</br>

```
e.g. npm run build rare-lib-common
```

The build artifacts will be stored in the `dist/<project name>` directory.
</br>
> Ensure that the changes look right and that the version of package.json in the dist is what you expect.

</br>

> Development Testing</br>
> If you want to test an update without committing you can now copy the contents of `dist/<project name>` and paste it into the `node_modules/<project name>` of your project to test out changes. This saves actually committing changes while developing

</br>

Step 4: Commit updated dist

Either through `tower` / `vscode` or command line from `dist/<project name>` commit the dist changes to `master` (of the submodules repo).
> We have intentially allowed pushes directly to master for this project to save a step.

</br>

Step 5: Commit updated submodule

After committing the changes to the submodule there will be a last commit necessary on `ionic-libs-src` repo to commit:

- the `dist/<project name>` submodules file which will show a chnage like
 ```+Subproject commit f9f01afc5b38c298fde0c2ce4f6bd4538652e5a4-```

> We have intentially allowed pushes to master on this project so this step can be done directly.

</br>

Step 6: Create new tag

Finally go to <https://gitlab.rareloop.com/internal-projects/ionic-libs/-/tags> and create a new tag

</br>

Step 7: Pull in updates

In your projects using this library run `npm update <project name>` to pull in the latest changes

</br>

---

</br>

## Adding to the library

</br>

Step 1: Creating a new library

`npx ng generate library rare-lib-<name>`

E.g. `npx ng generate library rare-lib-browser`

>Note you will need to delete the `tslint.json` file created and update the `angular.json` to change the lint settings to

``` json
    "lint": {
        "builder": "@angular-eslint/builder:lint",
        "options": {
            "lintFilePatterns": [
                "projects/<project name>/src/**/*.ts",
                "projects/<project name>/src/**/*.html"
            ]
        }
    }
```

>Note you will also need to copy a new version of `karma.conf.js` so that it works with Headless Chrome for CI

</br>

Step 1: Adding a new element to a library

Run `npx ng generate module <name> --project rare-lib-<project name>` to generate a new module.

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project rare-lib-<project name>`.

E.g. `npx ng generate module browser --project rare-lib-browser`

</br>

Step 2:

Add an index.ts to the new `projects/rareloop-app-lib/src/lib/test/` folder and export everything that should be public.

Then add a new line to `projects/rareloop-app-lib/public-api.ts`:

``` typescript
export * from './lib/test';
```

</br>

---

</br>

## Running unit tests

</br>

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
