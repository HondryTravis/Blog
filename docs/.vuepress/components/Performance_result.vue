<template>
  <div>
    <table>
      <thead>
        <tr>
          <th style="text-align: center;">
            <div style="min-width: 40px;">优/缺</div>
          </th>
          <th style="text-align: center;">
            <div style="min-width: 120px;">CSR</div>
          </th>
          <th style="text-align: center;">
            <div style="min-width: 120px;">预渲染</div>
          </th>
          <th style="text-align: center;">SSR</th>
          <th style="text-align: center;">同构</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center;">优点</td>
          <td style="text-align: center;">
            <ul>
              <li>不依赖数据</li>
              <li>FP 时间最快</li>
              <li>客户端用户体验好</li>
              <li>内存数据共享</li>
            </ul>
          </td>
          <td style="text-align: center;">
            <ul>
              <li>不依赖数据</li>
              <li>FCP 时间比 CSR 快</li>
              <li>客户端体验好</li>
              <li>内存数据共享</li>
            </ul>
          </td>
          <td style="text-align: center;">
            <ul>
              <li>SEO 友好</li>
              <li>首屏性能高，FMP 比 CSR 和预渲染快</li>
            </ul>
          </td>
          <td style="text-align: center;">
            <ul>
              <li>SEO 友好</li>
              <li>首屏性能高，FMP 比 CSR 和预渲染快</li>
              <li>客户端用户体验好</li>
              <li>内存数据共享</li>
              <li>客户端与服务端代码共用，开发效率高</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="text-align: center;">缺点</td>
          <td style="text-align: center;">
            <ul>
              <li>SEO 不友好</li>
              <li>FCP FMP 慢</li>
            </ul>
          </td>
          <td style="text-align: center;">
            <ul>
              <li>SEO 不友好</li>
              <li>FMP 慢</li>
            </ul>
          </td>
          <td style="text-align: center;">
            <ul>
              <li>客户端数据共享成本高</li>
              <li>模版维护成本高</li>
            </ul>
          </td>
          <td style="text-align: center;">
            <ul>
              <li>Node 容易形成性能瓶颈</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {};
</script>