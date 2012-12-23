#pragma strict
//Import components
@script RequireComponent (CharacterController,Physics);
@script RequireComponent (AIAnimation);

//Setup component vars
//--------------------
private var controller:CharacterController;
private var animController:AIAnimation;

//Component Panel Params
//----------------------
var target: Transform;
var health: int = 35;
var speed:float = 5.0;
var rotationSpeed:float = 5.0;

//Attack
var delayShootTime: float = 0.35;
var attackRange: float = 1.5;

//Internal Params
//---------------
private var isAlive: boolean = true;
private var hit: RaycastHit;

//Unity's Default Functions
//-------------------------
function Awake () {
	controller = GetComponent (CharacterController);
	animController = GetComponent(AIAnimation);	
}

function Start () {
	Patrol();	
}

function Update () {
	//Physics.IgnoreCollision(hand.rigidbody.collider, controller.rigidbody.collider);
}


//Statement routines: Patrol, Persuit & Attack
//--------------------------------------------
function Patrol () {	
	while (true) {
		animation.CrossFade("idle", 1.0);
		if (Input.GetKey (KeyCode.L)){		
			yield StartCoroutine('Pursuit');			
		}			
		yield;		
	}
}

function Pursuit () {	
	
	while (true) {
		Physics.Raycast (transform.position+Vector3(0,.5,0), transform.rotation * Vector3.forward, hit, Mathf.Infinity);
		Debug.DrawRay (transform.position+Vector3(0,1,0), transform.rotation * Vector3.forward * hit.distance, Color.green);
		
		if (Vector3.Distance(target.transform.position, transform.position) < attackRange+1){	
		//if (hit.distance<attackRange){
			hit.distance=Mathf.Infinity;			
			yield StartCoroutine('Attack');			
		}
		else{
			MoveTowards(target.transform.position);
		}		
		yield;
	}
}

function Attack () {	
		
	animController.SetSpeed(0.0);
	
	// Start shoot animation
	animation.CrossFade("attack", 0.3);
	
	// Wait until half the animation has played
	yield WaitForSeconds(delayShootTime);	
	
	// Wait for the rest of the animation to finish
	yield WaitForSeconds(animation["attack"].length - delayShootTime);	

}

//Damage, Pain and Die
//--------------------
function Damage(){
	StopAllCoroutines();
	--health;
	print(health);
	if(health<=0){	
		Die();
	}else Pain();	
}

function Pain(){
	animController.SetSpeed(0.0);
	animation.CrossFade("resist");	
	yield WaitForSeconds(animation["resist"].length);
	Pursuit();
}

function Die () {
	isAlive = false;
	gameObject.collider.enabled = false;		
	animation.CrossFade("die", 1.0);
	yield WaitForSeconds(animation["die"].length);	
	gameObject.active = false;	
}

//Finder
//------
function findBone(current:Transform,name:String) : Transform{
 	if (current.name == name){
        return current;
    }
	for (var i = 0; i < current.GetChildCount(); ++i)
    {
        // the recursive step; repeat the search one step deeper in the hierarchy
        var found = findBone(current.GetChild(i), name);

        // a transform was returned by the search above that is not null,
        // it must be the bone we're looking for
        if (found != null)
            return found;
    }
    return found;
}


//Movement
//---------------------------------------------------------------------------------------------------------------
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
