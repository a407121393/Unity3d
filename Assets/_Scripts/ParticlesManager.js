#pragma strict

var Wreck:Rigidbody;
var NumberOfPieces:int = 10;

var Particles : ParticleEmitter;
var ParticlesTimeLive:float = Mathf.Infinity;
var OnCollision : boolean = false;

private var piece: Rigidbody;
private var rndVel:Vector3;

function Start(){
	if(!OnCollision){
		gameObject.collider.enabled = false;
		var particleClone : ParticleEmitter = Instantiate (Particles, transform.position, transform.rotation);
		particleClone.Emit();
		Destroy(particleClone.gameObject,ParticlesTimeLive);
	}
		
}

function OnCollisionEnter(collision : Collision) {	
	var particleClone : ParticleEmitter = Instantiate (Particles, transform.position, transform.rotation);
	particleClone.transform.position = collision.contacts[0].point;
	particleClone.transform.rotation = Quaternion.FromToRotation(Vector3.up, collision.contacts[0].normal);	
	particleClone.Emit();
	Destroy(particleClone.gameObject,ParticlesTimeLive);
	
	StartCoroutine(wrecker(collision));
	
	
}

function wrecker(collision:Collision){	
	
	for (var i=0; i<NumberOfPieces; i++) {

		piece = Instantiate(Wreck, collision.contacts[0].point, Quaternion.identity);		
		
		Physics.IgnoreCollision(piece.collider, transform.root.collider);		
			
		piece.transform.rotation = Quaternion.FromToRotation(Vector3.up, collision.contacts[0].normal);
		
		rndVel = Vector3( 0,Random.Range(-5.0, 10.0),0);
		
		piece.rigidbody.velocity = -collision.contacts[0].normal.normalized + rndVel;		
		
		Destroy(piece.gameObject,ParticlesTimeLive);
		
		//yield;

	}
    
    yield;
}
