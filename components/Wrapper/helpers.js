import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


// Material dynamic breakpoints...
export class Media {
  constructor() {
    // this.theme = this.up()
  }
  up(size) { return useMediaQuery(useTheme().breakpoints.up(size)) }
  down(size) { return useMediaQuery(useTheme().breakpoints.down(size)) }
  only(size) { return useMediaQuery(useTheme().breakpoints.only(size)) }
  between(a,b) { return useMediaQuery(useTheme().breakpoints.between(a,b)) }
}


// Helpers functions
export class Sys {
  constructor({isDev, isProd}) {
    this.isDev = isDev
    this.isProd = isProd
  }

  async sleep(ms=300) {
    if(this.isProd) return false;

    console.warn(`sleep ${ms}ms`);
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  print(...payload) {
    if(this.isProd) return false;

    const prefix = 'SysMsg >> '
    if(payload.length == 1 && ['object','array'].includes(typeof payload[0])) {
      console.log(prefix,...payload);
    } else {
      console.warn(prefix,...payload);
    }
  }

  plural({key=String, number=Number, number_hidden=false})  {

		const cases = [2, 0, 1, 1, 1, 2];
		const num = (number%100>4 && number%100<20) ? 2 : cases[(number%10<5)?number%10:5]
		const plural_id = num == 0 ? 1 : num == 1 ? 3 : num == 2 ? 10 : 0

		const common_key = `plural__${key}_${plural_id}`
		let response = this.t(common_key, {[plural_id]: number})

		if(response == common_key) {
			return number_hidden ? `${key}` : `${number} (${key})`
		}

		if(number_hidden) {
			response = this.t(common_key, {[plural_id]: ''})
			return response
		}

		return response;
	}

}
