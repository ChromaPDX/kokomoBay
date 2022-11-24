import {
  ClassyWhen,
  ClassyThen,
  ClassyGiven,
  ClassySuite,
} from "../level1/TesterantoClassy";

export class TesterantoClassic<
  Klass,
  SuiteExtensions,
  GivenExtensions,
  WhenExtensions,
  ThenExtensions
> {
  constructorator: new (...any) => Klass;

  givenOverides: Record<
    keyof GivenExtensions,
    (
      feature: string,
      whens: ClassyWhen<Klass>[],
      thens: ClassyThen<Klass>[],
      ...xtraArgs
    ) => ClassyGiven<Klass>
  >;
  whenOverides: Record<keyof WhenExtensions, (any) => ClassyWhen<Klass>>;
  thenOverides: Record<keyof ThenExtensions, (any) => ClassyThen<Klass>>;

  constructor(
    public readonly cc: new () => Klass,
    suites: any,
    givenOverides: Record<
      keyof GivenExtensions,
      (
        feature: string,
        whens: ClassyWhen<Klass>[],
        thens: ClassyThen<Klass>[],
        ...xtraArgs
      ) => ClassyGiven<Klass>
    >,
    whenOverides: Record<keyof WhenExtensions, (c2: any) => ClassyWhen<Klass>>,
    thenOverides: Record<keyof ThenExtensions, (d2: any) => ClassyThen<Klass>>
  ) {
    this.constructorator = cc;
    this.givenOverides = givenOverides;
    this.whenOverides = whenOverides;
    this.thenOverides = thenOverides;
  }

  Suites(): Record<
    keyof SuiteExtensions | "Default",
    (a: ClassyGiven<Klass>[]) => ClassySuite<Klass>
  > {
    /* @ts-ignore:next-line */
    return {
      Default: (givenz: ClassyGiven<Klass>[]) =>
        new ClassySuite<Klass>("Default constructor", givenz),
    };
  }

  Given(): Record<
    keyof GivenExtensions,
    (
      feature: string,
      whens: ClassyWhen<Klass>[],
      thens: ClassyThen<Klass>[],
      ...xtraArgs
    ) => ClassyGiven<Klass>
  > {
    return {
      ...this.givenOverides,
    };
  }

  When(): Record<
    keyof WhenExtensions | keyof Klass,
    (any) => ClassyWhen<Klass>
  > {
    const objectdescription = Object.getOwnPropertyDescriptors(
      this.constructorator.prototype
    );

    let autogeneratedWhens = {};
    // Object.keys(objectdescription).forEach((k, ndx) => {
    //   autogeneratedWhens[k] = (...xArgs) =>
    //     new ClassyWhen<Klass>(`!${k}`, (y) => {
    //       return y[k](...xArgs);
    //     });
    // });

    /* @ts-ignore:next-line */
    return {
      ...autogeneratedWhens,
      ...this.whenOverides,
    };
  }

  Then(): Record<
    keyof ThenExtensions | keyof Klass,
    (any) => ClassyThen<Klass>
  > {
    let autogeneratedWhens = {};
    // Object.keys(
    //   Object.getOwnPropertyDescriptors(this.constructorator.prototype)
    // ).forEach(
    //   (publicMethod, ndx) =>
    //     (autogeneratedWhens[publicMethod] = (expected) =>
    //       new ClassyThen<Klass>(`!${publicMethod}`, (thing) =>
    //         assert.equal(thing[publicMethod](expected), expected)
    //       ))
    // );

    /* @ts-ignore:next-line */
    return {
      ...autogeneratedWhens,
      ...this.thenOverides,
    };
  }
}