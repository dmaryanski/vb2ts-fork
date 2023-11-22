var TestDataNamespace;
(function (TestDataNamespace) {
    /**
     * The current base of a check
     */
    let CheckBase;
    (function (CheckBase) {
        CheckBase[CheckBase["Unverified"] = -2] = "Unverified";
        /**
         * The check went to review but was updated
         */
        CheckBase[CheckBase["Updated"] = -1] = "Updated";
        /**
         * The check is still open
         */
        CheckBase[CheckBase["Open"] = 0] = "Open";
        /**
         * The check is totally done
         */
        CheckBase[CheckBase["Done"] = 1] = "Done";
        /**
         * All owners of the check have confirmed it's Ok to pay for
         */
        CheckBase[CheckBase["Confirmed"] = 2] = "Confirmed";
    })(CheckBase = TestDataNamespace.CheckBase || (TestDataNamespace.CheckBase = {}));
})(TestDataNamespace || (TestDataNamespace = {}));
//# sourceMappingURL=CheckBase.js.map