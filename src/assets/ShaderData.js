const vert = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const frag_bg = `
varying vec2 vUv;
uniform float time;
uniform vec2 iResolution;
uniform sampler2D _MainTex;
void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = fract(vUv*vec2(11.0,11.0));
    vec4 tex = texture2D(_MainTex, uv);
    float alpha = abs(sin(uv.g*80.0+time))*0.15;
    alpha = max(tex.a+alpha,0.0);
    gl_FragColor = vec4(tex.rgb,alpha);
}
`;
const frag_main = `
varying vec2 vUv;
uniform float time;
uniform vec2 iResolution;
uniform sampler2D _MainTex;
void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = fract(vUv*vec2(11.0,11.0));
    vec4 tex = texture2D(_MainTex, vUv);
    gl_FragColor = tex;
}
`;
const frag_flipbook = `
vec2 Flipbook(vec2 UV, float Width, float Height, float Tile)
{
    Tile = mod(Tile, Width * Height);
    vec2 tileCount = vec2(1.0, 1.0) / vec2(Width, Height);
    float tileY = abs(1.0 * Height - (floor(Tile * tileCount.x) + 1.0 * 1.0));
    float tileX = abs(0.0 * Width - ((Tile - Width * floor(Tile * tileCount.x)) + 0.0 * 1.0));
    return (UV + vec2(tileX, tileY)) * tileCount;
}
varying vec2 vUv;
uniform float time;
uniform float _Width;
uniform float _Height;
uniform vec2 iResolution;
uniform sampler2D _MainTex;
void main() {
    //vec2 uv = gl_FragCoord.xy / iResolution;
    vec2 uv = Flipbook(vUv,_Width,_Height,floor(time*0.5));
    vec4 tex = texture2D(_MainTex, uv);
    gl_FragColor = tex;
}
`;
const frag_clip_text = `
varying vec2 vUv;
uniform float time;
uniform vec2 iResolution;
uniform sampler2D _MainTex;
void main() {
    vec2 uv = gl_FragCoord.xy / iResolution;
    uv = fract(vUv*vec2(11.0,11.0));
    vec4 tex = texture2D(_MainTex, vUv);
    gl_FragColor = vec4(tex.rgb,tex.a);
}
`;
const frag_danly_bg = `
vec2 Rotate(vec2 UV, float Rotation)
{
    UV -= 0.5;
    float s = sin(Rotation);
    float c = cos(Rotation);
    mat2 rMatrix = mat2(c, -s, s, c);
    rMatrix *= 0.5;
    rMatrix += 0.5;
    rMatrix = rMatrix * 2.0 - 1.0;
    UV.xy = (UV.xy * rMatrix);
    UV += 0.5;
    return UV;
}
varying vec2 vUv;
uniform float time;
uniform vec2 iResolution;
uniform sampler2D _MainTex;
void main() {
    vec2 uv = floor(vUv*200.0);
    uv = uv/200.0;
    uv = Rotate(uv*vec2(2.0,1.0),0.2);
    float line = sin(vUv.y*500.0)*0.3+1.0;
    vec4 tex = texture2D(_MainTex, uv+time*0.01);
    gl_FragColor = vec4(tex.rgb*line*0.8,1);
}
`;
const frag_post= `
uniform sampler2D tDiffuse;
uniform float amount;
varying vec2 vUv;
void main() {
  vec4 color = texture2D( tDiffuse, vUv );
  gl_FragColor = 0.5 * color;
}
`;
export {vert,frag_bg,frag_main,frag_post,frag_danly_bg,frag_clip_text,frag_flipbook}