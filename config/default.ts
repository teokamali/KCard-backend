export default {
    port: 3000,
    baseUrl: "localhost",
    db: {
        name: "restful-api-v2",
        port: 27017,
        url: "mongodb://localhost:27017",
    },
    ttl: {
        accessToken: "15m",
        refreshToken: "10d",
    },
    keys: {
        saltWorkFactor: 10,
        publicKey: `-----BEGIN PUBLIC KEY-----
        MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgEVBHdkxrLNRV7iyXelSS04nW4Ry
        obR4SBauv82Qr/64KYeIMRgVb0mzXjjHnoRbVa22+td+TsoUZpdHcMRR2OyrTHd5
        yvhi4UNTZq/PzL8e68hczHx7+HZfrAOXRVMgPlkMbjPs06HxWP2qYe8Q6WjnM3mb
        Q/D/OhmKuxS9jrW1AgMBAAE=
        -----END PUBLIC KEY-----`,
        privateKey: `-----BEGIN RSA PRIVATE KEY-----
        MIICWgIBAAKBgEVBHdkxrLNRV7iyXelSS04nW4RyobR4SBauv82Qr/64KYeIMRgV
        b0mzXjjHnoRbVa22+td+TsoUZpdHcMRR2OyrTHd5yvhi4UNTZq/PzL8e68hczHx7
        +HZfrAOXRVMgPlkMbjPs06HxWP2qYe8Q6WjnM3mbQ/D/OhmKuxS9jrW1AgMBAAEC
        gYAH1NQ+QlrIMFOeJDVwdAjl/pdfw+K7WLq2Le6snUb5o/O2StVaZtod2HW4MAKh
        7v4iVcXJ5pOcUHBFfSOoX6ULCDZFZoOyp0w1zRSjZVUBsiwkbs1KlawOq9bmb+cq
        9updik0VmXhvCmb93BMZOtFXjMTLcSXSAETcEROJHVlqgQJBAIm/aTsW7N9UviO/
        aztnUfoTflUfvTrc0OkWNH4Ta24K7fi0FHlrnUkyno+FB5MstUYNkvTydKCJmVe1
        gqiZ42ECQQCAtQka+3CoGbHxs8GO49GxcQS895+dLZjS7yDVpFn2V+FUgjNly43e
        Ry20r3gpQlY4gTEF9aFT/GF1QUE4WEbVAkAemTRo+di4a3ypODY7xeHB6V6gziIc
        1zxY6qPSdcHhefAO1QHPTwZrYiEyxFxAZygFXbKNUuZxWt+DSkCx7y1BAkAE/oFW
        8bDCZRTZix8Um1R0rS0A5B7ma3GFpc/BWno/K9PLgq3Z4lcj6+EjJLfl6fQMhz7O
        u2RCLQXfFeQg+pPtAkB6MHMSXOqkVg5YIesEFV12F5Hz9hNWinv9yqUcdHbtPhIl
        CTxVTki8ayksf9x8kLRy68nKqfx1pLzcesLGUAGe
        -----END RSA PRIVATE KEY-----`,
    },
};
