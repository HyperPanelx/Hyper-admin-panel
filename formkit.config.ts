import { DefaultConfigOptions,defaultConfig } from '@formkit/vue'
import { createFloatingLabelsPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'

const config: DefaultConfigOptions = defaultConfig({
    plugins: [
        createFloatingLabelsPlugin({
            useAsDefault: true, // defaults to false
        }),
    ],
})


export default config