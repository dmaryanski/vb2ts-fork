namespace TestDataNamespace {
  /**
   * The current base of a check
   */
  export enum CheckBase {
    Unverified = -2,
    /**
     * The check went to review but was updated
     */
    Updated = -1,
    /**
     * The check is still open
     */
    Open = 0,
    /**
     * The check is totally done
     */
    Done = 1,
    /**
     * All owners of the check have confirmed it's Ok to pay for
     */
    Confirmed = 2
  }
}