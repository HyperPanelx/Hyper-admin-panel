import { DefaultConfigOptions,defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin,createMultiStepPlugin  } from '@formkit/addons'
import '@formkit/themes/genesis'

const config: DefaultConfigOptions = defaultConfig({
    plugins: [
        createFloatingLabelsPlugin({
            useAsDefault: true, // defaults to false
        }),
        createMultiStepPlugin()
    ],
    content: ['./src/**/*.{html,js,vue}', './path/to/formkit.config.js'],
})


export default config