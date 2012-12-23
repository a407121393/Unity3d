#pragma strict
var minimumRunSpeed = 1.0;

function Start () {
	// Set all animations to loop
	animation.wrapMode = WrapMode.Loop;

	// Except our action animations, Dont loop those
	animation["attack"].wrapMode = WrapMode.Once;
	animation["resist"].wrapMode = WrapMode.Once;
	animation["die"].wrapMode = WrapMode.ClampForever;
	
	// Put idle and run in a lower layer. They will only animate if our action animations are not playing
	animation["idle"].layer = -1;
	animation["walk"].layer = -1;
	animation["run"].layer = -1;
	
	animation.Stop();
}

function SetSpeed (speed : float) {
	if (speed > minimumRunSpeed)
		animation.CrossFade("run");
	else
		animation.CrossFade("idle");
}