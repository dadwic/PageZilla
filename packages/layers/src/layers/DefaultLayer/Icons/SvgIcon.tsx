import styled from 'styled-components';

const SvgIcon: any = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  preserveAspectRatio: 'xMidYMid meet',
  viewBox: '0 0 24 24',
  role: 'img',
  fontSize: 'inherit',
})`
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  font-size: 1rem;
`;

export default SvgIcon;
