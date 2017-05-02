namespace TestDataNamespace {
  /**
   * The current status of the World
   */
  export enum WorldStatus {
    /**
     * The world is open to be edited
     */
    Open = 0,
    /**
     * All planets have been closed
     */
    Closed = 1,
    /**
     * All items on the planets are too huge to continue
     */
    Continued = 2,
    Unknown = -1
  }
}