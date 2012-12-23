#pragma strict

function OnCollisionEnter(collision : Collision) {

	//print(collision.collider.name);
	
	//collision.gameObject.SendMessage('Hit',2.0,SendMessageOptions.DontRequireReceiver);
	
	//collision.gameObject.BroadcastMessage('Hit');
	
	try
	{
	    //throw "Error, plz abort";
	    collision.gameObject.GetComponent(AI_1).Damage();
	    //Debug.Log("This will never execute");
	}
	catch(err)
	{
	    Debug.Log("Exception catched: " + err);
	}
	
	
	Destroy(rigidbody.gameObject);
	
}

//DontGoThroughThings
//http://wiki.unity3d.com/index.php?title=DontGoThroughThings

//var layerMask : LayerMask; //make sure we aren't in this layer 
private var skinWidth : float = 0.1; //probably doesn't need to be changed 
private var minimumExtent : float; 
private var partialExtent : float; 
private var sqrMinimumExtent : float; 
private var previousPosition : Vector3; 
private var myRigidbody : Rigidbody; 
//initialize values 
function Awake() { 
   myRigidbody = rigidbody; 
   previousPosition = myRigidbody.position; 
   minimumExtent = Mathf.Min(Mathf.Min(collider.bounds.extents.x, collider.bounds.extents.y), collider.bounds.extents.z); 
   partialExtent = minimumExtent*(1.0 - skinWidth); 
   sqrMinimumExtent = minimumExtent*minimumExtent; 
} 
 
function FixedUpdate() { 
   //have we moved more than our minimum extent? 
   var movementThisStep : Vector3 = myRigidbody.position - previousPosition; 
   var movementSqrMagnitude : float = movementThisStep.sqrMagnitude;
   if (movementSqrMagnitude > sqrMinimumExtent) { 
      var movementMagnitude : float = Mathf.Sqrt(movementSqrMagnitude);
      var hitInfo : RaycastHit; 
      //check for obstructions we might have missed 
      if (Physics.Raycast(previousPosition, movementThisStep, hitInfo, movementMagnitude));//, layerMask.value)) 
         myRigidbody.position = hitInfo.point - (movementThisStep/movementMagnitude)*partialExtent; 
   } 
   previousPosition = myRigidbody.position;
   
}