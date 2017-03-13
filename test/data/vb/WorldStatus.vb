Namespace TestDataNamespace
  ''' <summary>
  ''' The current status of the World
  ''' </summary>
  Public Enum WorldStatus
    ''' <summary>
    ''' The world is open to be edited
    ''' </summary>
    Open = 0
    ''' <summary>
    ''' All planets have been closed
    ''' </summary>
    Closed = 1
    ''' <summary>
    ''' All items on the planets are too huge to continue
    ''' </summary>
    Continued = 2
    Unknown = -1
  End Enum
End Namespace