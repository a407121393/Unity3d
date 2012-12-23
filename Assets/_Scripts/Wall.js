#pragma strict
var ParticlesTimeLive:float = 2.0;
private var Particles : ParticleEmitter;
function Start () {
    renderer.material.SetColor ("_Color", Color.magenta);
    Particles = GetComponentInChildren(ParticleEmitter);
}

function OnCollisionEnter(collision : Collision) {

	var particleClone : ParticleEmitter = Instantiate (Particles, transform.position, transform.rotation);
	particleClone.transform.position = collision.contacts[0].point;
	particleClone.transform.rotation = Quaternion.FromToRotation(Vector3.up, collision.contacts[0].normal);	
	particleClone.Emit();
	destroyParticles(particleClone,ParticlesTimeLive);
	
}

function destroyParticles(particleClone : ParticleEmitter, time:float) {
    yield WaitForSeconds(time);
    if(particleClone)
		Destroy(particleClone.gameObject);
}