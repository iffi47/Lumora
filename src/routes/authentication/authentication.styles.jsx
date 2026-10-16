import styled from 'styled-components';
export const AuthenticationContainer=styled.div`
 display:grid;grid-template-columns:1fr 1fr;gap:70px;max-width:980px;margin:30px auto 90px;
 >div{width:100%;padding:32px;background:#f4f0eb;border:1px solid #e9e2d9;border-radius:8px;}
 h2{font-size:27px;}span{font-size:14px;color:#716a61;}
 form>div:last-child{flex-wrap:wrap;gap:10px;}
 @media(max-width:760px){grid-template-columns:1fr;gap:24px;>div{padding:24px;}}
`;
