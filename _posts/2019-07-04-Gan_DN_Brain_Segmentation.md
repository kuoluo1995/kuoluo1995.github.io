---
layout: post
update: 2019-07-04
title:  Adversarial training and dilated convolutions for brain MRI segmentation
categories: Summary
tags: [Gan,DN]
abstract: 这篇文章很好的介绍了如何使用Gan网络做医学图像分割
mathjax: true
---

* # 一、数据集
    *   |                |                     青年人                     |             老年人              |
        | -------------: | :--------------------------------------------: | :-----------------------------: |
        |       **年龄** |                 $32.9\pm19.2$                  |          $70.5\pm4.0$           |
        |       **种类** |           T<sub>1</sub>-weighted MR            | axial T<sub>1</sub>-weighted MR |
        |     **扫描仪** |          Siemens Vision 1.5T scanner           |   Philips Achieva 3T scanner    |
        |       **来源** | MICCAI 2012 challenge on multi-atlas labelling |      MRBrainS13 challenge       |
        |   **标签种类** |             WM,cGM,BGT,CB,BS,lvCSF             |   WM,cGM,BGT,CB,BS,lvCSF,pCSF   |
        | **数据集大小** |          训练数据集:15,验证数据集:20           |   训练数据集:5,验证数据集:15    |
* # 二、网络结构
    * ## 1. 分割网络
        * **FCN**
        *   | Kernel size | Dilation | Kernels | Layers |
            | :---------: | :------: | :-----: | :----: |
            | $3\times3$  |    1     |   32    |   15   |
            | $1\times1$  |    1     |   256   |   1    |
            | $1\times1$  |    1     |    C    |   1    |
                
        * **DN**
        *   | Kernel size | Dilation | Kernels | Layers |
            | :---------- | :------: | :-----: | :----: |
            | $3\times3$  |    1     |   32    |   2    |
            | $3\times3$  |    2     |   32    |   1    |
            | $3\times3$  |    4     |   32    |   1    |
            | $3\times3$  |    8     |   32    |   1    |
            | $3\times3$  |    16    |   32    |   1    |
            | $3\times3$  |    1     |   32    |   1    |
            | $1\times1$  |    1     |    C    |   1    |
                    
    * ## 2. 诊断网络
        * **1.Input**
            *   **One-hot encoding** or **Softmax output**
            *   | Kernel size | Dilation | Kernels | Layers |
                | :---------: | :------: | :-----: | :----: |
                | $3\times3$  |    1     |   32    |   2    |
                
            *   **Image data($25\times25$)**
            *   | Kernel size | Dilation | Kernels | Layers |
                | :---------: | :------: | :-----: | :----: |
                | $3\times3$  |    1     |   32    |   2    |

        * **2.将两个输入的结果进行连接**
        * **3.结构**
            *   | Kernel size | Dilation |   Kernels   | Layers |
                | :---------: | :------: | :---------: | :----: |
                | $3\times3$  |    1     |     32      |   3    |
                | $3\times3$  |    1     | max-pooling |   1    |
                | $3\times3$  |    1     |     32      |   2    |
                | $1\times1$  |    1     |     256     |   1    |
                | $1\times1$  |    1     |      2      |   1    |
            
* # 三、对抗训练
    * ## 1.流程图
        *   <div  class='image'>
                <img src='/assets/images/posts/2019/07/04/2019-07-04-adversarial_training.png' alt='训练流程图'/>
                <div class='image_alt'>训练流程图</div>
            </div>
    * ## 2.理论
        1.  * 分割网络参数 $\theta_s$  和 诊断网络参数 $\theta_d$ 更新依赖于以下三个Loss
                1. 分割网络的交叉熵 $L_s(\theta_s)$
                2. 使用手工分割作为输入的诊断网络的诊断Loss $L_d(\theta_d)$
                3. 随意一个图片作为输入的诊断Loss, $L_a(\theta_s,\theta_d)$
            * $L_s(\theta_s)$和$L_a(\theta_s,\theta_d)$ 影响着分割网络
            * $L_s(\theta_s)$ 最大影响着诊断Loss $L_a(\theta_s,\theta_d)$
            * 诊断网络比分割网络学习率更小(为了不让诊断Loss收敛的太快并可以足够影响着分割网络)
    * ## 3.注意点 
        1.  * 每个网络都包含**ReLU**
            * $1\times1$ 卷积层都包含了**BN**和**Dropout** 
            * **分割Optimizer:** RMSprop, **Learning Rate:** 10<sup>-3</sup>
            * **诊断Optimizer:** RMSprop, **Learning Rate:** 10<sup>-5</sup>
            * **Batch Size:** 100（L<sub>s</sub>,L<sub>d</sub>,L<sub>a</sub>)
            * **Epoch:** 5,每一代包含50000个训练patch每类每图
* # 四、结果
    * ## 1. 每个图片的训练参数$(\mu \pm \sigma)$变化
        * 1. 每张成人图片的参数数量
            * **FCN**: ($1745\pm400$) --> ($626\pm247$)
            * **DN**: ($417\pm152$) --> ($365\pm122$)
        * 2. 每张老人图片的参数数量
            * **FCN**: ($926\pm134$) --> ($692\pm88$)
            * **DN**: ($601\pm104$) --> ($481\pm90$)
    * ## 2. 分割的Dice结果变化
        *   <div class='image'>
                <img class='src' src='/assets/images/posts/2019/07/04/2019-07-04-dc_results.png' alt='DC结果图'/>
                <div class='image_alt'>Dice结果泳道图</div>
            </div>
    * ## 3. 展示效果图
        *   <div class='image'>
                <img class='src' src='/assets/images/posts/2019/07/04/2019-07-04-image_result.png' alt='展示效果图'/>
                <div class='image_alt'>展示效果图</div>
            </div>
* # 五、分析
    1.  1. 在本实验中**DN**看起来效果比普通的**max-pooling**好
        2. **Gan**的网络机制确实能提高分割效果
        3. 这篇文章很好的介绍了如何去实现**Gan**网络分割，是一篇很好的医学图像**Gan**的分割入门学习论文
* # 六、疑问
    1.  1. 对多目标分割常用的网络不清楚，但是感觉如果把**FCN**换成**nn-Unet**后还有提升效果吗？会不会是由于原本的分割精度就不是很高，所以**Gan**网络才有这样的效果？(**FCN**是2015年提出的方法，目前给出了不少可以提升精度的网络框架。)
        2. 有没有可能用一个网络来代替这两个网络的训练效果？毕竟Gan虽然有用，但训练起来并不方便

* # 参考文献
1. 1. [Moeskops P, Veta M, Lafarge M W, et al. Adversarial training and dilated convolutions for brain MRI segmentation[J]. Deep learning in medical image analysis and multimodal learning for clinical decision support, 2017: 56-64.](https://arxiv.org/pdf/1707.03195.pdf)
