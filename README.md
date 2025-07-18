### Issue Description

The test provided in this example replicates the issue we are experiencing:
```
{
    "code": 5000,
    "message": "Tried to allocate a collection of size 1952805748, but there are only 11 bytes remaining.",
    "timestamp": 1752845015659,
    "requestId": "838a11d2-131",
    "fieldsErrors": null,
    "stackTrace": "java.lang.RuntimeException: Tried to allocate a collection of size 1952805748, but there are only 11 bytes remaining.\n\tat org.apache.kafka.common.message.ConsumerProtocolAssignment.read(ConsumerProtocolAssignment.java:107)\n\tSuppressed: The stacktrace has been enhanced by Reactor, refer to additional information below: \nError has been observed at the following site(s):\n\t*__checkpoint ⇢ Handler com.provectus.kafka.ui.controller.ConsumerGroupsController#getConsumerGroupsPage(String, Integer, Integer, String, ConsumerGroupOrderingDTO, SortOrderDTO, ServerWebExchange) [DispatcherHandler]\n\t*__checkpoint ⇢ com.provectus.kafka.ui.config.CorsGlobalConfiguration$$Lambda$902/0x00000008006bb808 [DefaultWebFilterChain]\n\t*__checkpoint ⇢ com.provectus.kafka.ui.config.CustomWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ com.provectus.kafka.ui.config.ReadOnlyModeFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ AuthorizationWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ ExceptionTranslationWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ LogoutWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ ServerRequestCacheWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ SecurityContextServerWebExchangeWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ ReactorContextWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ HttpHeaderWriterWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ ServerWebExchangeReactorContextWebFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ org.springframework.security.web.server.WebFilterChainProxy [DefaultWebFilterChain]\n\t*__checkpoint ⇢ org.springframework.web.filter.reactive.ServerHttpObservationFilter [DefaultWebFilterChain]\n\t*__checkpoint ⇢ HTTP GET \"/api/clusters/Local/consumer-groups/paged?page=1&perPage=25&search=\" [ExceptionHandlingWebHandler]\nOriginal Stack Trace:\n\t\tat org.apache.kafka.common.message.ConsumerProtocolAssignment.read(ConsumerProtocolAssignment.java:107)\n\t\tat org.apache.kafka.common.message.ConsumerProtocolAssignment.<init>(ConsumerProtocolAssignment.java:75)\n\t\tat org.apache.kafka.clients.consumer.internals.ConsumerProtocol.deserializeAssignment(ConsumerProtocol.java:152)\n\t\tat org.apache.kafka.clients.consumer.internals.ConsumerProtocol.deserializeAssignment(ConsumerProtocol.java:171)\n\t\tat org.apache.kafka.clients.admin.internals.DescribeConsumerGroupsHandler.handleResponse(DescribeConsumerGroupsHandler.java:133)\n\t\tat org.apache.kafka.clients.admin.internals.AdminApiDriver.onResponse(AdminApiDriver.java:216)\n\t\tat org.apache.kafka.clients.admin.KafkaAdminClient$37.handleResponse(KafkaAdminClient.java:4554)\n\t\tat org.apache.kafka.clients.admin.KafkaAdminClient$AdminClientRunnable.handleResponses(KafkaAdminClient.java:1268)\n\t\tat org.apache.kafka.clients.admin.KafkaAdminClient$AdminClientRunnable.processRequests(KafkaAdminClient.java:1421)\n\t\tat org.apache.kafka.clients.admin.KafkaAdminClient$AdminClientRunnable.run(KafkaAdminClient.java:1344)\n\t\tat java.base/java.lang.Thread.run(Thread.java:833)\n"
}
```

When there is an active Platformatic/kafka consumer attached to a group, the group describe request fails with the error above.
We see this issue in Kakfa UI (provided in the example under localhost:8080) and also by using Kafka CLI command.

Steps to reproduce:
- Run `npm run docker:start`
- Run `npm run test`
- Wait for the `Consumer active` log to appear in the console.
- Attempt to describe the consumer group using either with Kafka CLI or with Kafka UI (consumers tab)
- The error will appear as described above.
- After the test completes (consumer is closed), the error will disappear, and you will be able to describe the consumer group without issues.