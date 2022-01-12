class KeyboardInput {
  constructor() {
    if (this.constructor === KeyboardInput) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }
}

export { KeyboardInput };
