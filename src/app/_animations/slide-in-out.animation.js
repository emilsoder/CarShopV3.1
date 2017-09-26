"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var animations_1 = require("@angular/animations");
exports.slideInOutAnimation = animations_1.trigger('slideInOutAnimation', [
    animations_1.state('*', animations_1.style({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    })),
    animations_1.transition(':enter', [
        animations_1.style({
            right: '-400%',
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }),
        animations_1.animate('.5s ease-in-out', animations_1.style({
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }))
    ]),
    animations_1.transition(':leave', [
        animations_1.animate('.5s ease-in-out', animations_1.style({
            right: '-400%',
            backgroundColor: 'rgba(0, 0, 0, 0)'
        }))
    ])
]);
//# sourceMappingURL=slide-in-out.animation.js.map