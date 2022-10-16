import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'


Bugsnag.start({
  apiKey: import.meta.env.VITE_BUGSNAG_KEY,
  plugins: [new BugsnagPluginVue()]
})

export default Bugsnag;
