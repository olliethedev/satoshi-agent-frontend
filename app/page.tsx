/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Message } from "ai";
import { useChat } from 'ai/react'

const SATS_PRICE = 10;

export default function Home() {

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      "Content-Type": "application/json",
    },
  });
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.png" />
        {/* search banner */}
        <meta property="og:image" content="https://satoshiagent.com/og-image.png" />
        <meta property="twitter:image" content="https://satoshiagent.com/og-image.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-base-100">
        <AppNav />
        <MessageList messages={messages} />
        <MessageInput input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}  />
      </main>
    </>
  );
}

const AppNav = () => {
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            <div className="w-10 rounded-full overflow-hidden">
              <img className="" src="/chat_head.png" alt="Satoshi Bot" />
            </div>
            Satoshi Agent
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Social</summary>
                <ul className="p-2 bg-base-200">
                  <li>
                    <a
                      href="https://twitter.com/olliethedev"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://snort.social/p/npub154hghkask9c4l9ek5ph543temlpwwdazkk2vnrgy0pnn7xh3pqhqrlx56a"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Nostr
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <button
                className=""
                onClick={() => (window as any).my_modal_1.showModal()}
              >
                Technical
              </button>
            </li>
            <li>
              <a
                href="https://getalby.com/p/olliethedev"
                target="_blank"
                rel="noreferrer noopener"
              >
                Tip The Dev
              </a>
            </li>
          </ul>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box bg-base-200">
          <h3 className="font-bold text-lg">How it all works 🤯</h3>
          <p className="py-4">TODO</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

const MessageList = ({messages}:{
  messages: Message[]
}) => {
  
  useEffect(() => {
    let element = document.getElementById("list-end");
    element?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);
  return (
    <div className="flex flex-col mx-auto max-w-7xl grow py-8 md:px-4 px-1 overflow-scroll gap-4">
      <IntroCard>
        <span>
          👋 Greetings! I am a Satoshi Nakamoto chatbot, developed by{" "}
          <a
            href="https://twitter.com/olliethedev"
            target="_blank"
            rel="noreferrer noopener"
            className="link link-primary inline-block"
          >
            @olliethedev
          </a>
          {". "}
          <br />
          I&apos;ve been trained on all of Satoshi&apos;s public statements.
          <br /> A small fee of <b>{`${SATS_PRICE}`} </b>
          <a
            href="https://en.bitcoin.it/wiki/Satoshi_(unit)"
            target="_blank"
            rel="noreferrer noopener"
            className="link link-primary inline-block"
          >
            satoshis
          </a>{" "}
          per message is required for our interaction, so ensure your browser
          extension is enabled with ⚡{" "}
          <a
            href="https://www.webln.guide/ressources/webln-providers"
            target="_blank"
            rel="noreferrer noopener"
            className="link link-primary inline-block"
          >
            WebLN
          </a>
          .<br />
          Feel free to inquire about anything!
        </span>
        {/* horizontal divider */}
        <div className="border-t border-gray-200 my-2" />
        <span className="body-sm text-xs text-gray-400">
          ⚠️ Disclaimer: Please note that responses are generated by an AI model
          and should not be considered as professional advice.
        </span>
      </IntroCard>
      {/* {messages.length === 0 && (
        <div className="flex flex-col items-end gap-3">
          <div className="title-sm">Try asking me one of these questions:</div>
          {exampleQuestions.map((question, index) => (
            <SuggestedQuestion question={question} key={index} />
            
          ))}
        </div>
      )} */}

      {messages.map((message) =>
        message.role === "user" ? (
          <ChatUserCard key={message.id} text={message.content} />
        ) : (
          <ChatBotCard key={message.id} message={message} />
        )
      )}
      <div id="list-end" />
    </div>
  );
};

const ChatBotCard = ({ message }: { message: Message }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="/chat_head.png" alt="Satoshi Bot" />
        </div>
      </div>
      <div className="chat-bubble">
        <div className="body-sm">
          {message.content && (
            <span>
              {message.content}
              {/* <ReactMarkdown remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
               const match = /language-(\w+)/.exec(className || '');
               return !inline && match ? (
                <SyntaxHighlighter
                 style={{...atomDark, text:"white"} as any}
                 language={match[1]}
                 PreTag="div"
                 {...props}
                >{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
               ) : (
                <span className={className} {...props}>
                 {children}
                </span>
               );
              },
            }} >{message.content}</ReactMarkdown> */}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const IntroCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="/chat_head.png" alt="Satoshi Bot" />
        </div>
      </div>
      <div className="chat-bubble">
        <div className={"body-sm"}>{children}</div>
      </div>
    </div>
  );
};

const ChatUserCard = ({ text }: { text: string }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="/chat_user.png" alt="Satoshi Bot" />
        </div>
      </div>
      <div className="chat-bubble">
        <div className="body-sm">{text}</div>
      </div>
    </div>
  );
};

const MessageInput = ({
  input,
  handleInputChange,
  handleSubmit,
}:{
  input: string,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
  
  
  return (
    <div className="card flex-row bg-base-300 shadow-xl max-w-7xl w-full">
      <form
        className="card-body flex-row gap-4 p-2 w-full"
        onSubmit={handleSubmit}
      >
        <input
          className="input w-full grow bg-base-100"
          type="text"
          placeholder="Ask me anything..."
          onChange={handleInputChange}
          value={input}
        />
        <button
          disabled={input.length === 0}
          className="btn btn-primary"
          type="submit"
        >
          Ask
        </button>
      </form>
    </div>
  );
};
