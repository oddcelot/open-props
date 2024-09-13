import browserslist from 'browserslist'
import { defineConfig } from 'vite'
import { browserslistToTargets, bundleAsync } from 'lightningcss'

export const config = defineConfig({
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: browserslistToTargets(browserslist('>= 0.25%')),
			drafts: { customMedia: true },
		},
	},
	build: {
		cssMinify: 'lightningcss',
	},
	plugins: [
		{
			name: 'css-additional-data',
			enforce: 'pre',
			transform(code, id) {
				if (id.endsWith('.css')) {
					// probably shouldn't inject `@custom-media` directly since it can cause an error such as:
					//   @import rules must precede all rules aside from @charset and @layer statements
					return (
						`@import "../css/media-queries.css";@import "../css/browser-queries.css";` +
						code
					)
				}
			},
		},
	],
})

export default config
