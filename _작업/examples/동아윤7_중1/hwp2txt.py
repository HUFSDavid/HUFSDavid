import olefile,zlib,struct,sys
def txt(path):
    f=olefile.OleFileIO(path)
    hdr=f.openstream('FileHeader').read(); comp=hdr[36]&1
    out=[]
    secs=sorted([e for e in f.listdir() if e[0]=='BodyText'],key=lambda e:int(e[1][7:]))
    for s in secs:
        d=f.openstream(s).read()
        if comp: d=zlib.decompress(d,-15)
        i=0
        while i<len(d):
            h=struct.unpack_from('<I',d,i)[0]; tag=h&0x3ff; size=(h>>20)&0xfff; i+=4
            if size==0xfff: size=struct.unpack_from('<I',d,i)[0]; i+=4
            if tag==67:
                b=d[i:i+size]; s2=[];j=0
                while j<len(b):
                    c=struct.unpack_from('<H',b,j)[0]
                    if c<32:
                        if c in (1,2,3,11,12,14,15,16,17,18,21,22,23): j+=16; continue
                        if c==9: s2.append('\t'); j+=16; continue
                        if c in(10,13): s2.append('\n')
                        j+=2; continue
                    s2.append(chr(c)); j+=2
                out.append(''.join(s2).rstrip('\n'))
            i+=size
    return '\n'.join(out)
for p in sys.argv[1:]:
    open(p[:-4]+'.txt','w',errors='replace').write(txt(p))
