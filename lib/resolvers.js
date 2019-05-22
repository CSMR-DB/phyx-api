"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockStrategy = { name: 'Strat', description: 'Something fun', side: 'CT' };
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        bye: () => 'See you again!',
        strategy: () => mockStrategy
    }
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map