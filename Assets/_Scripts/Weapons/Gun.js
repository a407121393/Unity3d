#pragma strict

var projectile : Rigidbody;
var ammo : int = 100;
var fireRate : float = 0.3;
var initialSpeed = 300.0;
var projectileLiveTime = 2.0;

private var nextFire : float = 0.0;

function Update(){
      if(Input.GetButton("Fire1")){
           if(Time.time > nextFire){
               nextFire = Time.time + fireRate;
               fire();
           }
      }
}

function fire(){ 

	// create a new projectile, use the same position and rotation as the Launcher.
	var instantiatedProjectile : Rigidbody = Instantiate (projectile, transform.position, transform.rotation);
	
	// Give it an initial forward velocity. The direction is along the z-axis of the missile launcher's transform.
	instantiatedProjectile.velocity = Camera.main.transform.TransformDirection(Vector3 (0, 0, initialSpeed));
	
	// Ignore collisions between the missile and the character controller
	Physics.IgnoreCollision(instantiatedProjectile.collider, transform.root.collider);
	StartCoroutine(destroyProjectile(instantiatedProjectile, projectileLiveTime));
}



function destroyProjectile(projectile : Rigidbody, time:float) {
    yield WaitForSeconds(time);
    if(projectile)
		Destroy(projectile.gameObject);

}