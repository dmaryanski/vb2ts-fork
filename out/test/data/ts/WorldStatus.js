var TestDataNamespace;
(function (TestDataNamespace) {
    /**
     * The current status of the World
     */
    let WorldStatus;
    (function (WorldStatus) {
        /**
         * The world is open to be edited
         */
        WorldStatus[WorldStatus["Open"] = 0] = "Open";
        /**
         * All planets have been closed
         */
        WorldStatus[WorldStatus["Closed"] = 1] = "Closed";
        /**
         * All items on the planets are too huge to continue
         */
        WorldStatus[WorldStatus["Continued"] = 2] = "Continued";
        WorldStatus[WorldStatus["Unknown"] = -1] = "Unknown";
    })(WorldStatus = TestDataNamespace.WorldStatus || (TestDataNamespace.WorldStatus = {}));
})(TestDataNamespace || (TestDataNamespace = {}));
//# sourceMappingURL=WorldStatus.js.map