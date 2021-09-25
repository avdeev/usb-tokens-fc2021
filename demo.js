// register / create a new credential
const credential = await navigator.credentials.create({
  publicKey: {
    rp: { name: "Acme" },
    user: { id: Uint8Array.from("UZSL85T9AFC", c => c.charCodeAt(0)), name: "john.p.smith@example.com", displayName: "John P. Smith" },
    pubKeyCredParams: [{ type: "public-key", alg: -7 }],
    attestation: "none",
    timeout: 60000,
    challenge: new Uint8Array(26),
    authenticatorSelection:{
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
