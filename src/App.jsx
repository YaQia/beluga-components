import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";

function App() {
  const [openSet, changeOpenSet] = createStore(new Set());

  createEffect(() => {
    console.log("count changed:", openSet);
  });

  function toggleStateManager(event) {
    if(event.target.id in openSet) changeOpenSet(openSet.delete(event.target.id));
    else changeOpenSet(openSet.add(event.target.id));
  }



  return (
    // <div class="mx-auto mt-[120px] w-[62%] max-w-[750px] px-10 "> 
    <div class="mx-auto pt-[160px] max-w-[756px] px-10 pb-[calc(30vh-8px)]">
      
      <h1>实验三：调试</h1>
      <details ontoggle={toggleStateManager} id="details-1">
        <summary class="h2-section">
          
          <h2>介绍</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-6" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clip-rule="evenodd"/></svg>
          
          <hr/>
        </summary>
        
        <p>这是上周调试的延续，参考<em>理解调试</em>。在本周的实验中，我们将使用上周用过的调试工具，并进行更多调试练习。今天实验的目标是进一步了解以下内容：</p>
        
        <ul>
          <li>
            <p>阅读堆栈跟踪并了解如何从中隔离错误</p>
            <p>堆栈跟踪是诊断程序错误的重要工具，它记录了程序执行过程中的调用链，能帮助开发者定位和解决问题。当程序发生异常时，堆栈跟踪会显示异常发生时的完整调用链，从异常发生点一直追溯到程序入口点。</p>
          </li>
          <li>
            <p>了解我们可能遇到的不同类型的异常</p>
          </li>
          <li>
            <p>更加舒适地使用<code>IntelliJ</code>调试器</p>
          </li>
          <li>
            <p>异常断点、表达式和监视（可选）</p>
          </li>
        </ul>
        <p>和往常一样，如果您不确定某些内容的含义，尤其是不确定堆栈跟踪中出现的特定异常或错误的含义（我们将在今天的实验中介绍），请随时查找相关内容。这些提示旨在引导您的思考，但我们建议您在打开提示之前，先自己尝试完成实验。</p>
        
      
      </details>
      
      <details id="details-2" ontoggle={toggleStateManager}>
        <summary class="h2-section">
          
          <h2>调试</h2>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="size-6" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd"/></svg>
          <hr/>
        </summary>
        <p>我们鼓励你通关每个完成的阶段，了解它们与游戏的关联。别忘了经常提交存档来保存你的进度！你需要进行如下步骤</p>
        
        <ol>
          <li>运行该<code>main</code>方法来运行<code>AdventureGame</code>游戏。运行游戏后，请按照给出的说明进行操作</li>
          <li>在运行游戏后，运行<code>tests/adventure/AdventureGameTests</code>中的测试</li>
          <li>要通过<code>AdventureGameTests</code>的全部测试，您需要修复所有单独的阶段测试（修复一个阶段将表明您已通过该阶段）。<strong>这些阶段应按照规范的顺序完成</strong></li>
        </ol>
        <p>下面的行表示程序发生错误所采用的方法序列：列表中的第一行是发生错误的地方，下面的行表示调用引发错误的方法的代码行，依此类推。您可以单击<code>blue text</code>导航至该文件和行。</p>
        <p><img src="https://sp25.datastructur.es/labs/lab03/img/puzzle-runtime-exception.png" alt=""/></p>
        <h3>调试<code>BeeCountingStage</code></h3>
        <p>对于以下每个阶段，<strong>只更改必要的内容</strong>！除非另有说明，否则不应重写整个代码块。我们已包含更改的行数作为指导。</p>
        <p>仅仅因为错误发生在某一行并不一定意味着那段代码不正确——堆栈跟踪中未显示的内容可能是难以捉摸的罪魁祸首！</p>
        <div class="warning">
          <p>这些练习将涉及一些看似晦涩难懂的代码，比如<code>AdventureGame</code>中的代码内容，强化抽象障碍，尝试在不完全理解代码的情况下找到答案！</p>
        </div>
        <div class="warning">
          <p>这些练习将涉及一些看似晦涩难懂的代码。强化抽象障碍，尝试在不完全理解代码的情况下找到答案！</p>
        </div>
        <p>如果调试器感觉没有响应，通常是因为代码中某个地方存在无限循环。如果你设置了断点，但始终无法到达，那么你就知道断点之前发生了无限循环！结合单步调试，可以找出问题所在。如果有什么问题，请点击<a href="https://sp25.datastructur.es/labs/lab03/faq/">这里</a></p>
        <h3>调试<code>PalindromeStage</code></h3>
        <p>有时，<code>IntelliJ</code>会告诉你一些它认为错误的内容。将鼠标悬停在出现错误的方法。可以插入如下的代码</p>
        <pre class="hljs language-js">
          <code>
            <span class="hljs-keyword">const</span> test = <span class="hljs-keyword">function</span> (<span class="hljs-params">bar</span>) {'{'}
            <span class="hljs-keyword">return</span> bar++;
            {'}'};
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">test</span>(<span class="hljs-number">5</span>));
          </code>
        </pre>
      </details>
    </div>
  );
}

export default App;
