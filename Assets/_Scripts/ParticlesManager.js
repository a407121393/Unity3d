#pragma strict
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
}

function destroyParticles(particleClone : ParticleEmitter, time:float) {
    yield WaitForSeconds(time);
    if(particleClone)
		Destroy(particleClone.gameObject);
}