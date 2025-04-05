import { createRequire } from 'module';const require = createRequire(import.meta.url);

// ../testeranto/dist/module/lib/index.js
var BaseTestInterface = {
  beforeAll: async (s) => s,
  beforeEach: async function(subject, initialValues, x, testResource, pm) {
    return subject;
  },
  afterEach: async (s) => s,
  afterAll: (store) => void 0,
  butThen: async (store, thenCb) => thenCb(store),
  andWhen: (a) => a,
  assertThis: () => null
};
var DefaultTestInterface = (p) => {
  return Object.assign(Object.assign({}, BaseTestInterface), p);
};
var defaultTestResourceRequirement = {
  ports: 0
};

// ../testeranto/dist/module/lib/abstractBase.js
var BaseSuite = class {
  constructor(name, index, givens = {}, checks = []) {
    this.name = name;
    this.index = index;
    this.givens = givens;
    this.checks = checks;
    this.fails = [];
  }
  features() {
    const features = Object.keys(this.givens).map((k) => this.givens[k].features).flat().filter((value, index, array) => {
      return array.indexOf(value) === index;
    });
    return features || [];
  }
  toObj() {
    const givens = Object.keys(this.givens).map((k) => this.givens[k].toObj());
    return {
      name: this.name,
      givens,
      fails: this.fails,
      features: this.features()
    };
  }
  setup(s, artifactory, tr, pm) {
    return new Promise((res) => res(s));
  }
  assertThat(t) {
    return t;
  }
  afterAll(store, artifactory, pm) {
    return store;
  }
  async run(input, testResourceConfiguration, artifactory, tLog, pm) {
    this.testResourceConfiguration = testResourceConfiguration;
    tLog("test resources: ", JSON.stringify(testResourceConfiguration));
    const suiteArtifactory = (fPath, value) => artifactory(`suite-${this.index}-${this.name}/${fPath}`, value);
    tLog("\nSuite:", this.index, this.name);
    const sNdx = this.index;
    const sName = this.name;
    for (const [gKey, g] of Object.entries(this.givens)) {
      const beforeAllProxy = new Proxy(pm, {
        get(target, prop, receiver) {
          if (prop === "customScreenShot") {
            return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), {
              // path: `${filepath}/${opts.path}`,
              path: `suite-${sNdx}/beforeAll/${opts.path}`
            }), p);
          }
          if (prop === "writeFileSync") {
            return (fp, contents) => target[prop](`suite-${sNdx}/beforeAll/${fp}`, contents);
          }
          return Reflect.get(...arguments);
        }
      });
      const subject = await this.setup(input, suiteArtifactory, testResourceConfiguration, beforeAllProxy);
      const giver = this.givens[gKey];
      try {
        this.store = await giver.give(subject, gKey, testResourceConfiguration, this.assertThat, suiteArtifactory, tLog, pm, sNdx);
      } catch (e) {
        console.error(e);
        this.fails.push(giver);
      }
    }
    try {
      this.afterAll(
        this.store,
        artifactory,
        // afterAllProxy
        pm
      );
    } catch (e) {
      console.error(e);
    }
    return this;
  }
};
var BaseGiven = class {
  constructor(name, features, whens, thens, givenCB, initialValues) {
    this.name = name;
    this.features = features;
    this.whens = whens;
    this.thens = thens;
    this.givenCB = givenCB;
    this.initialValues = initialValues;
  }
  beforeAll(store, initializer, artifactory, testResource, initialValues, pm) {
    return store;
  }
  toObj() {
    return {
      key: this.key,
      name: this.name,
      whens: this.whens.map((w) => w.toObj()),
      thens: this.thens.map((t) => t.toObj()),
      error: this.error ? [this.error, this.error.stack] : null,
      // fail: this.fail ? [this.fail] : false,
      features: this.features
    };
  }
  async afterEach(store, key, artifactory, pm) {
    return store;
  }
  async give(subject, key, testResourceConfiguration, tester, artifactory, tLog, pm, suiteNdx) {
    this.key = key;
    tLog(`
 ${this.key}`);
    tLog(`
 Given: ${this.name}`);
    const givenArtifactory = (fPath, value) => artifactory(`given-${key}/${fPath}`, value);
    try {
      const beforeEachProxy = new Proxy(pm, {
        get(target, prop, receiver) {
          if (prop === "writeFileSync") {
            return (fp, contents) => target[prop](`suite-${suiteNdx}/given-${key}/when/beforeEach/${fp}`, contents);
          }
          if (prop === "customScreenShot") {
            return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `suite-${suiteNdx}/given-${key}/when/beforeEach/${opts.path}` }), p);
          }
          if (prop === "screencast") {
            return (opts, p) => target.screencast(Object.assign(Object.assign({}, opts), { path: `suite-${suiteNdx}/given-${key}/when/beforeEach/${opts.path}` }), p);
          }
          return Reflect.get(...arguments);
        }
      });
      this.uberCatcher((e) => {
        console.error(e);
        this.error = e.error;
        tLog(e.stack);
      });
      this.store = await this.givenThat(subject, testResourceConfiguration, givenArtifactory, this.givenCB, this.initialValues, beforeEachProxy);
      for (const [whenNdx, whenStep] of this.whens.entries()) {
        await whenStep.test(this.store, testResourceConfiguration, tLog, pm, `suite-${suiteNdx}/given-${key}/when/${whenNdx}`);
      }
      for (const [thenNdx, thenStep] of this.thens.entries()) {
        const t = await thenStep.test(this.store, testResourceConfiguration, tLog, pm, `suite-${suiteNdx}/given-${key}/then-${thenNdx}`);
        tester(t);
      }
    } catch (e) {
      console.error(e);
      this.error = e;
      tLog(e.stack);
    } finally {
      try {
        const afterEachProxy = new Proxy(pm, {
          get(target, prop, receiver) {
            if (prop === "customScreenShot") {
              return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `suite-${suiteNdx}/given-${key}/afterEach/${opts.path}` }), p);
            }
            if (prop === "writeFileSync") {
              return (fp, contents) => target[prop](`suite-${suiteNdx}/given-${key}/afterEach/${fp}`, contents);
            }
            return Reflect.get(...arguments);
          }
        });
        await this.afterEach(
          this.store,
          this.key,
          givenArtifactory,
          // pm
          afterEachProxy
        );
      } catch (e) {
        console.error("afterEach failed! no error will be recorded!", e);
      }
    }
    return this.store;
  }
};
var BaseWhen = class {
  constructor(name, whenCB) {
    this.name = name;
    this.whenCB = whenCB;
  }
  toObj() {
    return {
      name: this.name,
      error: this.error
    };
  }
  async test(store, testResourceConfiguration, tLog, pm, filepath) {
    tLog(" When:", this.name);
    const name = this.name;
    const andWhenProxy = new Proxy(pm, {
      get(target, prop, receiver) {
        if (prop === "customScreenShot") {
          return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `${filepath}/${opts.path}` }), p);
        }
        if (prop === "writeFileSync") {
          return (fp, contents) => target[prop](`${filepath}/andWhen/${fp}`, contents);
        }
        return Reflect.get(...arguments);
      }
    });
    return await this.andWhen(store, this.whenCB, testResourceConfiguration, andWhenProxy).catch((e) => {
      this.error = true;
    });
  }
};
var BaseThen = class {
  constructor(name, thenCB) {
    this.name = name;
    this.thenCB = thenCB;
    this.error = false;
  }
  toObj() {
    return {
      name: this.name,
      error: this.error
    };
  }
  async test(store, testResourceConfiguration, tLog, pm, filepath) {
    tLog(" Then:", this.name);
    try {
      const butThenProxy = new Proxy(pm, {
        get(target, prop, receiver) {
          if (prop === "customScreenShot") {
            return (opts, p) => target.customScreenShot(Object.assign(Object.assign({}, opts), { path: `${filepath}/${opts.path}` }), p);
          }
          if (prop === "writeFileSync") {
            return (fp, contents) => target[prop](`${filepath}/${fp}`, contents);
          }
          return Reflect.get(...arguments);
        }
      });
      return this.butThen(store, this.thenCB, testResourceConfiguration, butThenProxy).catch((e) => {
        this.error = true;
        throw e;
      });
    } catch (e) {
      console.log("test failed", e);
      this.error = e.message;
      throw e;
    }
  }
};
var BaseCheck = class {
  constructor(name, features, checkCB, whens, thens) {
    this.name = name;
    this.features = features;
    this.checkCB = checkCB;
    this.whens = whens;
    this.thens = thens;
  }
  async afterEach(store, key, cb, pm) {
    return;
  }
  async check(subject, key, testResourceConfiguration, tester, artifactory, tLog, pm) {
    tLog(`
 Check: ${this.name}`);
    const store = await this.checkThat(subject, testResourceConfiguration, artifactory, pm);
    await this.checkCB(Object.entries(this.whens).reduce((a, [key2, when]) => {
      a[key2] = async (payload) => {
        return await when(payload, testResourceConfiguration).test(store, testResourceConfiguration, tLog, pm, "x");
      };
      return a;
    }, {}), Object.entries(this.thens).reduce((a, [key2, then]) => {
      a[key2] = async (payload) => {
        const t = await then(payload, testResourceConfiguration).test(store, testResourceConfiguration, tLog, pm);
        tester(t);
      };
      return a;
    }, {}));
    await this.afterEach(store, key, () => {
    }, pm);
    return;
  }
};

// ../testeranto/dist/module/lib/basebuilder.js
var BaseBuilder = class {
  constructor(input, suitesOverrides, givenOverides, whenOverides, thenOverides, checkOverides, testResourceRequirement, testSpecification) {
    this.input = input;
    this.artifacts = [];
    this.artifacts = [];
    this.testResourceRequirement = testResourceRequirement;
    this.suitesOverrides = suitesOverrides;
    this.givenOverides = givenOverides;
    this.whenOverides = whenOverides;
    this.thenOverides = thenOverides;
    this.checkOverides = checkOverides;
    this.testSpecification = testSpecification;
    this.specs = testSpecification(this.Suites(), this.Given(), this.When(), this.Then(), this.Check());
    this.testJobs = this.specs.map((suite) => {
      const suiteRunner = (suite2) => async (puppetMaster, tLog) => {
        const x = await suite2.run(input, puppetMaster.testResourceConfiguration, (fPath, value) => puppetMaster.testArtiFactoryfileWriter(tLog, (p) => {
          this.artifacts.push(p);
        })(puppetMaster.testResourceConfiguration.fs + "/" + fPath, value), tLog, puppetMaster);
        return x;
      };
      const runner = suiteRunner(suite);
      return {
        test: suite,
        toObj: () => {
          return suite.toObj();
        },
        runner,
        receiveTestResourceConfig: async function(puppetMaster) {
          const logFilePath = "log.txt";
          const access = await puppetMaster.createWriteStream(logFilePath);
          const tLog = (...l) => {
            puppetMaster.write(access, `${l.toString()}
`);
          };
          const suiteDone = await runner(puppetMaster, tLog);
          const logPromise = new Promise((res, rej) => {
            puppetMaster.end(access);
            res(true);
          });
          const numberOfFailures = Object.keys(suiteDone.givens).filter((k) => {
            return suiteDone.givens[k].error;
          }).length;
          puppetMaster.writeFileSync(`exitcode`, numberOfFailures.toString());
          const o = this.toObj();
          puppetMaster.writeFileSync(`littleBoard.html`, `
            <!DOCTYPE html>
<html lang="en">

<head>
  <meta name="description" content="Webpage description goes here" />
  <meta charset="utf-8" />
  <title>kokomoBay - testeranto</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="author" content="" />

  <link rel="stylesheet" href="/TestReport.css" />
  <script src="/TestReport.js"></script>

</head>

  <body>
    <h1>Test report</h1>
            <div id="root"/>
  </body>
            `);
          puppetMaster.writeFileSync(`tests.json`, JSON.stringify(this.toObj(), null, 2));
          return {
            failed: numberOfFailures,
            artifacts: this.artifacts || [],
            logPromise,
            features: suiteDone.features()
          };
        }
      };
    });
  }
  Specs() {
    return this.specs;
  }
  Suites() {
    return this.suitesOverrides;
  }
  Given() {
    return this.givenOverides;
  }
  When() {
    return this.whenOverides;
  }
  Then() {
    return this.thenOverides;
  }
  Check() {
    return this.checkOverides;
  }
};

// ../testeranto/dist/module/lib/classBuilder.js
var ClassBuilder = class extends BaseBuilder {
  constructor(testImplementation, testSpecification, input, suiteKlasser, givenKlasser, whenKlasser, thenKlasser, checkKlasser, testResourceRequirement) {
    const classySuites = Object.entries(testImplementation.suites).reduce((a, [key], index) => {
      a[key] = (somestring, givens, checks) => {
        return new suiteKlasser.prototype.constructor(somestring, index, givens, checks);
      };
      return a;
    }, {});
    const classyGivens = Object.entries(testImplementation.givens).reduce((a, [key, g]) => {
      a[key] = (features, whens, thens, givEn) => {
        return new givenKlasser.prototype.constructor(key, features, whens, thens, testImplementation.givens[key], givEn);
      };
      return a;
    }, {});
    const classyWhens = Object.entries(testImplementation.whens).reduce((a, [key, whEn]) => {
      a[key] = (payload) => {
        return new whenKlasser.prototype.constructor(`${whEn.name}: ${payload && payload.toString()}`, whEn(payload));
      };
      return a;
    }, {});
    const classyThens = Object.entries(testImplementation.thens).reduce((a, [key, thEn]) => {
      a[key] = (expected, x) => {
        return new thenKlasser.prototype.constructor(`${thEn.name}: ${expected && expected.toString()}`, thEn(expected));
      };
      return a;
    }, {});
    const classyChecks = Object.entries(testImplementation.checks).reduce((a, [key, z]) => {
      a[key] = (somestring, features, callback) => {
        return new checkKlasser.prototype.constructor(somestring, features, callback, classyWhens, classyThens);
      };
      return a;
    }, {});
    super(input, classySuites, classyGivens, classyWhens, classyThens, classyChecks, testResourceRequirement, testSpecification);
  }
};

// ../testeranto/dist/module/lib/core.js
var Testeranto = class extends ClassBuilder {
  constructor(input, testSpecification, testImplementation, testResourceRequirement = defaultTestResourceRequirement, testInterface, uberCatcher) {
    const fullTestInterface = DefaultTestInterface(testInterface);
    super(testImplementation, testSpecification, input, class extends BaseSuite {
      afterAll(store, artifactory, pm) {
        return fullTestInterface.afterAll(
          store,
          // (fPath: string, value: unknown) =>
          //   // TODO does not work?
          //   {
          //     artifactory(`afterAll4-${this.name}/${fPath}`, value);
          //   },
          pm
        );
      }
      assertThat(t) {
        fullTestInterface.assertThis(t);
      }
      async setup(s, artifactory, tr, pm) {
        return (fullTestInterface.beforeAll || (async (input2, artifactory2, tr2, pm2) => input2))(
          s,
          this.testResourceConfiguration,
          // artifactory,
          pm
        );
      }
    }, class Given extends BaseGiven {
      constructor() {
        super(...arguments);
        this.uberCatcher = uberCatcher;
      }
      async givenThat(subject, testResource, artifactory, initializer, initialValues, pm) {
        return fullTestInterface.beforeEach(
          subject,
          initializer,
          // artifactory,
          testResource,
          initialValues,
          pm
        );
      }
      afterEach(store, key, artifactory, pm) {
        return new Promise((res) => res(fullTestInterface.afterEach(
          store,
          key,
          // (fPath: string, value: unknown) =>
          //   artifactory(`after/${fPath}`, value),
          pm
        )));
      }
    }, class When extends BaseWhen {
      async andWhen(store, whenCB, testResource, pm) {
        try {
          return await fullTestInterface.andWhen(store, whenCB, testResource, pm);
        } catch (e) {
          throw e;
        }
      }
    }, class Then extends BaseThen {
      async butThen(store, thenCB, testResource, pm) {
        return await fullTestInterface.butThen(store, thenCB, testResource, pm).then((v) => {
          return v;
        }, (e) => {
          console.log(" ERROR ", e);
          throw e;
        });
      }
    }, class Check extends BaseCheck {
      constructor(name, features, checkCallback, whens, thens, initialValues) {
        super(name, features, checkCallback, whens, thens);
        this.initialValues = initialValues;
      }
      async checkThat(subject, testResourceConfiguration, artifactory, pm) {
        return fullTestInterface.beforeEach(
          subject,
          this.initialValues,
          // (fPath: string, value: unknown) =>
          //   artifactory(`before/${fPath}`, value),
          testResourceConfiguration,
          this.initialValues,
          pm
        );
      }
      afterEach(store, key, artifactory, pm) {
        return new Promise((res) => res(fullTestInterface.afterEach(
          store,
          key,
          // (fPath: string, value: unknown) =>
          //   // TODO does not work?
          //   artifactory(`afterEach2-${this.name}/${fPath}`, value),
          pm
        )));
      }
    }, testResourceRequirement);
  }
};

// ../testeranto/dist/module/PM/node.js
import fs from "fs";
import path from "path";

// ../testeranto/dist/module/PM/index.js
var PM = class {
};

// ../testeranto/dist/module/PM/node.js
var fPaths = [];
var PM_Node = class extends PM {
  constructor(t) {
    super();
    this.server = {};
    this.testResourceConfiguration = t;
  }
  waitForSelector(p, s) {
    return globalThis["waitForSelector"](p, s);
  }
  closePage(p) {
    return globalThis["closePage"](p);
  }
  goto(cdpPage, url) {
    return globalThis["goto"](cdpPage.mainFrame()._id, url);
  }
  newPage() {
    return globalThis["newPage"]();
  }
  $(selector) {
    throw new Error("Method not implemented.");
  }
  isDisabled(selector) {
    throw new Error("Method not implemented.");
  }
  getAttribute(selector, attribute) {
    throw new Error("Method not implemented.");
  }
  getValue(selector) {
    throw new Error("Method not implemented.");
  }
  focusOn(selector) {
    throw new Error("Method not implemented.");
  }
  typeInto(value) {
    throw new Error("Method not implemented.");
  }
  page() {
    return globalThis["page"]();
  }
  click(selector) {
    return globalThis["click"](selector);
  }
  screencast(opts, page) {
    return globalThis["screencast"](Object.assign(Object.assign({}, opts), { path: this.testResourceConfiguration.fs + "/" + opts.path }), page.mainFrame()._id, this.testResourceConfiguration.name);
  }
  screencastStop(p) {
    return globalThis["screencastStop"](p);
  }
  customScreenShot(opts, cdpPage) {
    return globalThis["customScreenShot"](Object.assign(Object.assign({}, opts), { path: this.testResourceConfiguration.fs + "/" + opts.path }), cdpPage.mainFrame()._id, this.testResourceConfiguration.name);
  }
  existsSync(destFolder) {
    return globalThis["existsSync"](this.testResourceConfiguration.fs + "/" + destFolder);
  }
  mkdirSync() {
    return globalThis["mkdirSync"](this.testResourceConfiguration.fs + "/");
  }
  write(writeObject, contents) {
    return globalThis["write"](writeObject.uid, contents);
  }
  writeFileSync(filepath, contents) {
    return globalThis["writeFileSync"](this.testResourceConfiguration.fs + "/" + filepath, contents, this.testResourceConfiguration.name);
  }
  createWriteStream(filepath) {
    return globalThis["createWriteStream"](this.testResourceConfiguration.fs + "/" + filepath, this.testResourceConfiguration.name);
  }
  end(writeObject) {
    return globalThis["end"](writeObject.uid);
  }
  customclose() {
    globalThis["customclose"](this.testResourceConfiguration.fs, this.testResourceConfiguration.name);
  }
  testArtiFactoryfileWriter(tLog, callback) {
    return (fPath, value) => {
      callback(new Promise((res, rej) => {
        tLog("testArtiFactory =>", fPath);
        const cleanPath = path.resolve(fPath);
        fPaths.push(cleanPath.replace(process.cwd(), ``));
        const targetDir = cleanPath.split("/").slice(0, -1).join("/");
        fs.mkdir(targetDir, { recursive: true }, async (error) => {
          if (error) {
            console.error(`\u2757\uFE0FtestArtiFactory failed`, targetDir, error);
          }
          fs.writeFileSync(path.resolve(targetDir.split("/").slice(0, -1).join("/"), "manifest"), fPaths.join(`
`), {
            encoding: "utf-8"
          });
          if (Buffer.isBuffer(value)) {
            fs.writeFileSync(fPath, value, "binary");
            res();
          } else if (`string` === typeof value) {
            fs.writeFileSync(fPath, value.toString(), {
              encoding: "utf-8"
            });
            res();
          } else {
            const pipeStream = value;
            const myFile = fs.createWriteStream(fPath);
            pipeStream.pipe(myFile);
            pipeStream.on("close", () => {
              myFile.close();
              res();
            });
          }
        });
      }));
    };
  }
  // launch(options?: PuppeteerLaunchOptions): Promise<Browser>;
  startPuppeteer(options) {
  }
};

// ../testeranto/dist/module/Node.js
var NodeTesteranto = class extends Testeranto {
  constructor(input, testSpecification, testImplementation, testResourceRequirement, testInterface) {
    super(input, testSpecification, testImplementation, testResourceRequirement, testInterface, () => {
    });
  }
  async receiveTestResourceConfig(partialTestResource) {
    const t = JSON.parse(partialTestResource);
    const pm = new PM_Node(t);
    const { failed, artifacts, logPromise, features } = await this.testJobs[0].receiveTestResourceConfig(pm);
    return { features, failed };
  }
};
var Node_default = async (input, testSpecification, testImplementation, testInterface, testResourceRequirement = defaultTestResourceRequirement) => {
  return new NodeTesteranto(input, testSpecification, testImplementation, testResourceRequirement, testInterface);
};

export {
  Node_default
};
