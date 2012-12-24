#pragma strict

function Start () {

}

function Update () {

}

function OnCollisionEnter(collision : Collision) {
	// Debug-draw all contact points and normals
	for (var contact : ContactPoint in collision.contacts)
	    Debug.DrawRay(contact.point, contact.normal, Color.white);
	
	// Play a sound if the coliding objects had a big impact.        
	//if (collision.relativeVelocity.magnitude > 2)
		//audio.Play();
	
	var vFinal:Vector3;
	var impulse:Vector3;
	
	if(collision.collider.name =="Bip01 R Hand"){
		var controller = GetComponent (CharacterController);
		//print(rigidbody); 
		vFinal = collision.rigidbody.mass * collision.relativeVelocity / (rigidbody.mass + collision.rigidbody.mass);
		//var impulse = vFinal * rigidbody.mass;
		//print( impulse );
		impulse = rigidbody.mass * ( collision.rigidbody.velocity - rigidbody.velocity);
		//rigidbody.isKinematic = false;
		//rigidbody.angularVelocity = impulse;
		//rigidbody.isKinematic = true;
	}
//	else if(collision.rigidbody){ 
//		vFinal = collision.rigidbody.mass * collision.relativeVelocity / (rigidbody.mass + collision.rigidbody.mass);
//		impulse = vFinal * rigidbody.mass;
//		rigidbody.angularVelocity = impulse;		
//	}
	
}

function OnCollisionStay(collisionInfo : Collision) {
    // Debug-draw all contact points and normals
    for (var contact : ContactPoint in collisionInfo.contacts)
        Debug.DrawRay(contact.point, contact.normal, Color.white);
}

function OnCollisionExit(collisionInfo : Collision) {
}