#pragma strict

var Stone:Rigidbody;
var Particles : ParticleEmitter;
var ParticlesTimeLive:float = Mathf.Infinity;
var OnCollision : boolean = false;

function Start(){
	if(!OnCollision){
		gameObject.collider.enabled = false;
		var particleClone : ParticleEmitter = Instantiate (Particles, transform.position, transform.rotation);
		particleClone.Emit();
		destroyParticles(particleClone,ParticlesTimeLive);
	}
		
}

function OnCollisionEnter(collision : Collision) {	
	var particleClone : ParticleEmitter = Instantiate (Particles, transform.position, transform.rotation);
	particleClone.transform.position = collision.contacts[0].point;
	particleClone.transform.rotation = Quaternion.FromToRotation(Vector3.up, collision.contacts[0].normal);	
	particleClone.Emit();
	//destroyParticles(particleClone,ParticlesTimeLive);
	Destroy(particleClone,ParticlesTimeLive);
	
	StartCoroutine(wrecker(collision));
	
	
}

function wrecker(collision:Collision){
	for (var i=0; i<5; i++) {

        var aStone : Rigidbody = Instantiate(Stone, collision.contacts[0].point, Quaternion.identity);
        
        //aStone.collider.enabled=false;
        Physics.IgnoreCollision(aStone.collider, transform.root.collider);
        
		var y = Random.Range(-5.0, 5.0);
		
		var z = Random.Range(0.0, 5.0);
		

		        

        aStone.velocity = collision.contacts[0].normal * -z;
        
        aStone.velocity.y = y;
        
        Destroy(aStone.gameObject,ParticlesTimeLive);
        
        //yield;

    }
    
    yield;
}

function destroyParticles(particleClone : ParticleEmitter, time:float) {
    yield WaitForSeconds(time);
    if(particleClone)
		Destroy(particleClone.gameObject);
}