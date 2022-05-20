uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.1415926535;

void main() {
    vUv = uv;
    vec3 newPosition = position;
    newPosition.y +=  0.5 * sin(uTime);
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}