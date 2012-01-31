define(['./math/constants', './converters/hsvToRgb'], function (constants, hsvToRgb) {
        
        return function (n, saturation, value) {
            var hue = n * constants.phi % 1;
            return hsvToRgb(hue, saturation || 0.5, value || 0.95);
        };
        
    }
);