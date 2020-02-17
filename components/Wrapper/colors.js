import C from 'color';


export class Colors {
  constructor(color) {
    this.color = C(color).hsl()
  }
  opacity(val) {
    return `rgba(${this.color.rgb().array().slice(0, 3).join(',')}, ${val})`
  }
  lighten(val=.1) {
    const color = this.color.lighten(val).rgb().string()
    return color;
  }
  darken(val=.1) {
    const color = this.color.darken(val).rgb().string()
    return color;
  }
  inverse() {
    try {
      const res = this.color.isLight() ? '#000000' : '#FFFFFF'
      this.color = C(res)
    } catch(err) {
      console.error('colors.inverse error:', err);
    }

    return this.color.rgb().string()
  }
  negate() {
    return this.color.negate().rgb().string();
  }
  // full(opacity=1) {
  //   try {
  //     this.color = `rgba(${C(this.color).rgb().array().slice(0, 3).join(',')}, ${opacity})`
  //   } catch(err) {
  //     console.error('colors.inverse error:', err);
  //   }
  //
  //   return this.color;
  // }
}

// https://www.npmjs.com/package/color

// color.hsl().string()  // 'hsl(320, 50%, 100%)'
// color.luminosity();  // 0.412
// color.contrast(Color("blue"))  // 12

// color.isLight();  // true
// color.isDark();   // false
// color.negate()         // rgb(0, 100, 255) -> rgb(255, 155, 0)
//
// color.lighten(0.5)     // hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)
// color.darken(0.5)      // hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
//
// color.saturate(0.5)    // hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)
// color.desaturate(0.5)  // hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)
// color.grayscale()      // #5CBF54 -> #969696
//
// color.whiten(0.5)      // hwb(100, 50%, 50%) -> hwb(100, 75%, 50%)
// color.blacken(0.5)     // hwb(100, 50%, 50%) -> hwb(100, 50%, 75%)
//
// color.fade(0.5)     // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
// color.opaquer(0.5)     // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1.0)
//
// color.rotate(180)      // hsl(60, 20%, 20%) -> hsl(240, 20%, 20%)
// color.rotate(-90)      // hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)
//
// color.mix(Color("yellow"))        // cyan -> rgb(128, 255, 128)
// color.mix(Color("yellow"), 0.3)   // cyan -> rgb(77, 255, 179)
//
// // chaining
// color.green(100).grayscale().lighten(0.6)
