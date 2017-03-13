Namespace TestDataNamespace
  ''' <summary>
  ''' The current base of a check
  ''' </summary>
  Public Enum CheckBase
    Unverified = -2
    ''' <summary>
    ''' The check went to review but was updated
    ''' </summary>
    Updated = -1
    ''' <summary>
    ''' The check is still open
    ''' </summary>
    Open = 0
    ''' <summary>
    ''' The check is totally done
    ''' </summary>
    Done = 1
    ''' <summary>
    ''' All owners of the check have confirmed it's Ok to pay for
    ''' </summary>
    Confirmed = 2
  End Enum
End Namespace