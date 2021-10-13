// register / create a new credential
const credential = await navigator.credentials.create({
  publicKey: {
    rp: { name: "Acme" },
    user: { id: Uint8Array.from("1234567890123456", c => c.charCodeAt(0)), name: "a.avdeev@mish.design", displayName: "Avdeev" },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
    attestation: "none",
	// attestation: "direct",
    timeout: 60000,
    challenge: new Uint8Array(26),
    authenticatorSelection:{
	//   userVerification: "required",
      userVerification: "discouraged"
    },
  }
});
console.log("NEW CREDENTIAL", credential);

// decode the clientDataJSON into a utf-8 string
JSON.parse(new TextDecoder('utf-8').decode(credential.response.clientDataJSON));

// login
const assertion = await navigator.credentials.get({
  publicKey: {
    timeout: 60000,
    allowCredentials: [{
      id: credential.rawId,
      transports: ["usb", "nfc", "ble"],
      type: "public-key"
    }],
    challenge: new Uint8Array(26),
  },
});
console.log("ASSERTION", assertion);
JSON.parse(new TextDecoder('utf-8').decode(assertion.response.clientDataJSON));

new Uint8Array([
	0x79, 0x50, 0x68, 0x71, 0xDA, 0xEE, 0xEE, 0xB9, 0x94, 0xC3, 0xC2, 0x15, 0x67, 0x65, 0x26, 0x22,
	0xE3, 0xF3, 0xAB, 0x3B, 0x78, 0x2E, 0xD5, 0x6F, 0x81, 0x26, 0xE2, 0xA6, 0x01, 0x7D, 0x74, 0x50
]).buffer
