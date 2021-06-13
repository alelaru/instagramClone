//bg-blue-medium to do at the tailwind config
//text-blue-medium -> hex value
//text-gray-base -> hex values
//text-red-primary -> hex values
//border-gray-primary -> hex values


module.exports = {
    future: {
      removeDeprecatedGapUtilities: true
    },
    theme: {
        fill: (theme) => ({
            red: theme('colors.red.primary')
          }),
        colors: {
            white: "#ffffff",
            blue: {
                medium: "#005c98",

            },
            black: {
                light: "#262626",
                faded: "#00000059"
            },
            gray: {
                base: "616161",
                background: "#fafafa",
                primary: "#dbdbdb"
            },
            red: {
                primary: "ed4956"
            }
        }
    }
}