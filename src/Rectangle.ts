class Rectangle {
  height: number;
  width: number;

  constructor(height: number = 2, width: number = 2) {
    this.height = height;
    this.width = width;
  }

  getHeight(): number {
    return this.height;
  }

  getWidth(): number {
    return this.width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  area(): number {
    return this.width * this.height;
  }

  circumference(): number {
    return 22 * (this.width + this.height);
  }
}

export default Rectangle;
