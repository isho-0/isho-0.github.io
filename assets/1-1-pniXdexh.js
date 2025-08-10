const n=`---
title: "1-1. C++ 시작하기"
date: "2024-03-15"
category: "cpp"
chapter: "chapter1"
order: 1
excerpt: "C++의 기본 개념과 첫 프로그램 작성하기"
image: "/blog/assets/cpp/chapter1/1-1.jpg"
tags: ["C++", "Programming", "Basics"]
author: "이상호"
readingTime: 5
---

# C++ 시작하기

## 1. C++이란?

C++은 Bjarne Stroustrup이 개발한 프로그래밍 언어로, C 언어의 확장판입니다. 객체 지향 프로그래밍을 지원하며, 시스템 프로그래밍부터 게임 개발까지 다양한 분야에서 사용됩니다.

## 2. 첫 C++ 프로그램

\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`

## 3. 프로그램 구조 설명

1. \`#include <iostream>\`: 입출력 기능을 사용하기 위한 헤더 파일 포함
2. \`int main()\`: 프로그램의 시작점
3. \`std::cout\`: 표준 출력 스트림
4. \`return 0\`: 프로그램 정상 종료

## 4. 다음 단계

다음 강의에서는 변수와 데이터 타입에 대해 배워보겠습니다. `;export{n as default};
