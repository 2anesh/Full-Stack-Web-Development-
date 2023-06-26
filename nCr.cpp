class Solution{
public:
    const int mod = 1000000007;
    int modpow(int a, int n){
        int res = 1;
        a%=n;
        while(n>0){
            
            if(n%2!=0){
                res = (1LL*res*a)%mod;
            }
            
            a = (1LL*a*a)%mod;
            n/=2;
        }
        return res;
    }
    int nCr(int n, int r){
        if(r>n) return 0;
        if(r==n) return 1;
        
        // code here
        int fact[n];
        fact[0] = 1;
        for(int i=1;i<=n;i++){
            fact[i] = (1LL*i*fact[i-1])%mod;
        }
        
        int a = fact[n], b = fact[r], c = fact[n-r];
        
        int ans = (1LL*modpow(b,mod-2)*modpow(c,mod-2))%mod;
        ans = (1LL*ans*a)%mod;
        
        return ans;
        
        
    }
};
