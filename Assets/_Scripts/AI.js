#pragma strict
var target : Transform;

//Params
var health:int = 4;

// Make sure there is always a character controller
@script RequireComponent (CharacterController,Physics);
@script RequireComponent (AIAnimation);

private var controller:CharacterController;

private var animController:AIAnimation;

//@script RequireComponent(Rigidbody);

function Awake () {
	print('Awake');
	hand = findBone(transform,"Bip01 R Hand");
	controller = GetComponent (CharacterController);
	animController = GetComponent(AIAnimation);
	
	//var sc : SphereCollider;
	//sc = gameObject.AddComponent ("SphereCollider");
	//sc.radius = 0.1;
	hand.name = transform.name;
	
	
	
}
var hand:Transform;
function Start () {
	//var body = transform.Find("Bip01");
	//hand = findBone(transform,"Bip01 R Hand");
	//hand.rigidbody.hideFlags;
	//controller.collisionFlags
	print('Start');	
	//yield WaitForSeconds(5);
	Patrol();
	
}

function findBone(current:Transform,name:String) : Transform{
	var found:Transform;
 	if (current.name == name){
        return current;
    }
	for (var i = 0; i < current.GetChildCount(); ++i)
    {
        // the recursive step; repeat the search one step deeper in the hierarchy
        found = findBone(current.GetChild(i), name);

        // a transform was returned by the search above that is not null,
        // it must be the bone we're looking for
        if (found != null)
            return found;
    }
    return found;
}

private var hit : RaycastHit;
function Update () {
	//Physics.IgnoreCollision(hand.rigidbody.collider, controller.rigidbody.collider);
}

function Patrol () {
	
	while (true) {
		print('Patrol');
		if (Input.GetKey (KeyCode.W)){		
			yield StartCoroutine('Persuit');
			//rigidbody.angularVelocity = Vector3(0,10,10);	
		}
		
		
			
		yield;		
	}
}

function Persuit () {
	
	
	while (true) {
		
		//print('Persuit');
		Physics.Raycast (transform.position+Vector3(0,.5,0), transform.rotation * Vector3.forward, hit, Mathf.Infinity);
		Debug.DrawRay (transform.position+Vector3(0,1,0), transform.rotation * Vector3.forward * hit.distance, Color.green);
		
		//if (Vector3.Distance(target.transform.position, transform.position) < attackRange){	
		if (hit.collider && hit.collider.name==target.name && hit.distance<attackRange){			
			yield StartCoroutine('Attack');
			
		}
		else MoveTowards(target.transform.position);		
		yield;
	}
}

//Attack
var delayShootTime = 0.35;
var attackRange = 1.5;

//private var total_bullets = 3;

function Attack () {
	if(health<=0){
		yield StartCoroutine('Die');
	}
	//if(--total_bullets<0){
		//animation.CrossFade("victory", 1.0);
		//yield WaitForSeconds(animation["victory"].length);
		//animation.CrossFade("charge", 0.3);
		//yield WaitForSeconds(animation["charge"].length);
		
	//}else{
		//print('Attack');
		//Physics.Raycast (hand.position, transform.rotation * Vector3.forward, hit, Mathf.Infinity);
		
		
		animController.SetSpeed(0.0);
		
		// Start shoot animation
		animation.CrossFade("attack", 0.3);
	
		// Wait until half the animation has played
		yield WaitForSeconds(delayShootTime);
		//print(Vector3.Distance(target.transform.position, hand.transform.position));
		//print(hit.distance);
		
		// Fire gun
		//BroadcastMessage("Fire");
		
		
		// Wait for the rest of the animation to finish
		yield WaitForSeconds(animation["attack"].length - delayShootTime);
	//}
	//yield;
}

//Die
//---------------------------------------------------------------------------------------------------------------
var isAlive:boolean = true;
function Die () {
	
	while (true) {
		if(isAlive){	
			animation.CrossFade("die", 1.0);
			//WaitForSeconds(animation["die"].length);
			isAlive = false;
		}
		yield;
	}
	
}

//Movement
var speed:float = 5.0;
var rotationSpeed:float = 5.0;

function RotateTowards (position : Vector3) {
	//SendMessage("SetSpeed", 0.0, SendMessageOptions.DontRequireReceiver);
	
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1)
		return;
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);
}

function MoveTowards (position : Vector3) {
	var direction = position - transform.position;
	direction.y = 0;
	if (direction.magnitude < 0.1) {
		animController.SetSpeed(0.0);
		return;
	}
	
	// Rotate towards the target
	transform.rotation = Quaternion.Slerp (transform.rotation, Quaternion.LookRotation(direction), rotationSpeed * Time.deltaTime);
	transform.eulerAngles = Vector3(0, transform.eulerAngles.y, 0);

	// Modify speed so we slow down when we are not facing the target
	var forward = transform.TransformDirection(Vector3.forward);
	var speedModifier = Vector3.Dot(forward, direction.normalized);
	speedModifier = Mathf.Clamp01(speedModifier);

	// Move the character
	direction = forward * speed * speedModifier;
	controller.SimpleMove(direction);
	
	animController.SetSpeed(speed * speedModifier);
	
	//SendMessage("SetSpeed", speed * speedModifier, SendMessageOptions.DontRequireReceiver);
}

function shit(){
	health-=1;
	print(health);
}

function OnCollisionEnter(collision : Collision) {
print(collision.transform);
	//if(collision.transform.tag != target.transform.tag);
	//shit();
	
}

function OnTriggerEnter ( collision : Collider ){
print(transform.name);
	//if(collision.transform.parent.name!=transform.name)
		///shit();
	//if(transform.name!=target.name&&collision.transform.name!=transform.name)
	//shit();
//	if(collision.collider.name!=transform.name){
//		shit();
//		print(collision.collider.name+" "+transform.name+" "+target.name);
//	}
//	 if (controller.collisionFlags == CollisionFlags.None)
//        print("Free floating!");
//
//    if (controller.collisionFlags & CollisionFlags.Sides)
//        print("Touching sides!");
//        
//    if (controller.collisionFlags == CollisionFlags.Sides)
//        print("Only touching sides, nothing else!");
//
//    if (controller.collisionFlags & CollisionFlags.Above)
//        print("Touching sides!");
//        
//    if (controller.collisionFlags == CollisionFlags.Above)
//        print("Only touching Ceiling, nothing else!");
//
//    if (controller.collisionFlags & CollisionFlags.Below)
//        print("Touching ground!");
//        
//    if (controller.collisionFlags == CollisionFlags.Below)
//        print("Only touching ground, nothing else!");

}